'use strict';

// Directed relationships in a fixed pack. One decision match may traverse only
// its own candidate edges. Competencies and shared URLs never seed other cards.
function createEvidenceGraph(pack, routes) {
  const nodes = new Map();
  const outgoing = new Map();
  const addNode = (id, kind, label) => {
    if (nodes.has(id)) throw Error('Duplicate graph node: ' + id);
    nodes.set(id, { id, kind, label });
    outgoing.set(id, []);
  };
  const link = (from, relation, to, detail = {}) => {
    if (!nodes.has(from) || !nodes.has(to)) throw Error('Unknown graph endpoint: ' + from + ' / ' + to);
    outgoing.get(from).push({ from, relation, to, ...detail });
  };
  function source(url) {
    const id = 'source:' + url;
    if (!nodes.has(id)) addNode(id, 'public_source', url);
    return id;
  }
  for (const skill of pack.competencies) addNode(skill.id, 'competency', skill.name);
  for (const person of pack.leaders) {
    addNode(person.id, 'roster_pointer', person.name);
    link(person.id, 'points_to', source(person.source_url), { read_scope: person.read_scope });
  }
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  for (const card of pack.cards) {
    addNode(card.id, 'research_candidate', card.title);
    for (const id of card.competency_ids) link(card.id, 'addresses', id);
    link(card.id, 'cites', source(card.source_url), { locator: card.locator, read_scope: card.read_scope });
    const attribution = ' ' + normalize(card.author) + ' ';
    for (const person of pack.leaders) {
      if (attribution.includes(' ' + normalize(person.name) + ' ')) link(person.id, 'named_in_attribution', card.id);
    }
  }
  const works = [];
  for (const route of routes) {
    if (!/^D\d{2}$/.test(route.id) || !route.label || !route.groups?.length || !route.cards?.length ||
        route.groups.length < 2 || route.groups.some(group => !Array.isArray(group) || !group.length || group.some(term => typeof term !== 'string' || !normalize(term)))) throw Error('Invalid decision pattern: ' + route.id);
    addNode(route.id, 'decision_pattern', route.label);
    for (const id of route.cards) {
      if (nodes.get(id)?.kind !== 'research_candidate') throw Error('Unknown candidate card: ' + id);
      link(route.id, 'suggests_reading', id);
    }

    if (route.work) {
      const {title, acronym, url} = route.work;
      const cards = route.cards.filter(id => outgoing.get(id).some(edge => edge.relation === 'cites' && edge.to === 'source:' + url));
      if (!normalize(title) || !/^[A-Z]{2,12}$/.test(acronym) || !cards.length) throw Error('Invalid source for ' + route.id);
      const acronymReference = new RegExp('\\b' + acronym + '\\s+(?:paper|study|framework)\\b(?!\\s+models?\\b)');
      works.push({title: normalize(title), acronymReference, cards});
    }
  }
  // Resolve a specific cited work before topical keywords or a roster name.
  // A positive result only locates the card; reading scope stays on the citation.
  function lookupWork(raw) {
    const query = normalize(raw);
    const named = works.filter(work => {
      if ((' ' + query + ' ').includes(' ' + work.title + ' ')) return true;
      if (/\b(astronomy|orbit|nasa|astronauts?|telescope)\b/.test(query)) return false;
      return work.acronymReference.test(raw) && /\b(full|research|reviewed|claim|prove|establish|abstract|authors?|evidence|findings|productivity)\b/.test(query);
    });
    const links = (raw.match(/https?:\/\/[^\s<>"`]+/gi) || []).map(url => url.replace(/[.,;:!?')\]]+$/, ''));
    const cardIds = new Set(named.flatMap(work => work.cards));
    const urls = new Set(links);
    for (const card of pack.cards) if (urls.has(card.source_url)) cardIds.add(card.id);
    if (cardIds.size) return cardIds;
    // The pack records card excerpts; it has no book/chapter coverage manifest.
    const bookLookup = /\b(?:b\d+ is retrieved|every page of|cite exact pages|(?:summarize|summarise|review) the book|which chapter of|chapter \d+ of)\b/.test(query);
    const linkLookup = links.length && /\b(?:paper|article|study|read|reviewed|summarize|summarise|source)\b/.test(query);
    return bookLookup || linkLookup ? cardIds : null;
  }
  function paths(query, people, contains) {
    const byCard = new Map();
    function visit(origin, relation) {
      for (const edge of outgoing.get(origin)) {
        if (edge.relation !== relation || byCard.has(edge.to)) continue;
        byCard.set(edge.to, { origin, relation, card: edge.to });
      }
    }
    for (const person of people) visit(person.id, 'named_in_attribution');
    for (const route of routes) {
      if (route.groups.every(group => group.some(term => contains(query, term)))) visit(route.id, 'suggests_reading');
    }
    return byCard;
  }
  function describe(card, path) {
    const citation = outgoing.get(card.id).find(edge => edge.relation === 'cites');
    return { ...(path || { card: card.id }), source: citation.to };
  }
  return {
    paths, describe, lookupWork, label: id => nodes.get(id)?.label,
    snapshot: () => structuredClone({ nodes: [...nodes.values()], edges: [...outgoing.values()].flat() })
  };
}
module.exports = { createEvidenceGraph };
