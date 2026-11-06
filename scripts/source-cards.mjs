import {icon} from './icons.mjs';
const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const labels={'software-engineering':'Engineering & security','media-production':'Video & motion','voice-audio':'Voice & audio','marketing-growth':'SEO & growth','design-creation':'Design & interfaces','business-analytics':'Analytics & decisions','agents-automation':'Agent workflows','intelligence-memory':'Document intelligence','infrastructure':'Infrastructure'};
const icons={'software-engineering':'code','media-production':'palette','voice-audio':'audio','marketing-growth':'globe','design-creation':'cursor','business-analytics':'chart','agents-automation':'branch','intelligence-memory':'document','infrastructure':'monitor'};
const summaries={
  'security-audit-skill':'Structured security-audit instructions with finding validation and machine-readable reporting.',
  'lemo-opuscar':'Code-based film styles and examples for product stories and visual explainers.',
  'LYNX-SHARE':'A desktop audio workstation reference for sequencing, mixing, and audio editing workflows.',
  'claude-seo':'SEO audit guidance covering technical checks, structured data, and search visibility.',
  'reelkit':'A touch-first slider component reference for short-form media interfaces.',
  'roast-room':'A simulated advisory discussion format for examining business options and trade-offs.',
  'OpenMontage':'An agent-oriented video production reference with pipeline and tool guidance.',
  'umami':'A web and product analytics platform reference for traffic, events, funnels, and conversions.',
  'huashu-art-motion':'Code-driven art and animation patterns for visual storytelling.',
  'VOX-COLLAGE-BROLL':'A collage-style explainer-video workflow linking spoken content and supporting visuals.',
  'onetake':'Continuous-camera motion-film patterns for launch narratives and feature demos.',
  'hyperframes':'An HTML-based video rendering toolkit reference for agent-assisted production.',
  'geo-seo-claude':'AI-search and SEO assessment guidance for citations, crawler access, and structured content.',
  'hypit':'Video variation and production workflow references for reviewing creative alternatives.',
  'pentagi':'A security-agent orchestration reference for explicitly authorized testing environments.',
  'Wan2.2':'Video generation model and inference code references requiring a separate model runtime.',
  'harvey':'Sales research, outreach drafting, and campaign workflow references for host agents.',
  'compound-engineering-plugin':'Agent workflows connecting planning, implementation, review, and knowledge capture.',
  'magic-mcp':'A legacy UI-component MCP compatibility package; upstream now recommends the 21st MCP.',
  'moonshine':'Voice-interface toolkit references covering speech recognition and low-latency interaction.',
  'awesome-llm-apps':'Example applications and patterns for agents, retrieval, and model-backed workflows.',
  'andrej-karpathy-skills':'Coding-agent guidelines focused on assumptions, scope, simplicity, and verification.',
  'superplane':'Engineering workflow orchestration references for implementation and verification stages.',
  'indra':'Document intelligence and OCR references for recognition, reading order, and structured extraction.',
  'sill':'A desktop-to-device interaction reference for remote viewing and input workflows.'
};
export function sourceSections(additions,capabilities,total){
  return {
    SOURCE_SUMMARY:`${additions.length} newly reviewed repositories · ${total} curated source repositories`,
    SOURCE_GROUPS:[...new Set(additions.map(source=>source.group_id))].map(group=>`<option value="${escape(group)}">${escape(labels[group]||group)}</option>`).join(''),
    SOURCE_CARDS:additions.map(record=>{
      const source={...record,description:summaries[record.name]||record.description};
      const related=source.capability_ids.map(id=>capabilities.find(item=>item.id===id));
      const needsReview=!['MIT','Apache-2.0','ISC','CC0-1.0','BSD-2-Clause','BSD-3-Clause'].includes(source.license);
      return `<article class="pc-source-card" data-source-group="${escape(source.group_id)}" data-capabilities="${source.capability_ids.join(' ')}"><div class="pc-source-heading"><span class="pc-source-icon">${icon(icons[source.group_id]||'grid')}</span><div><span class="pc-source-category">${escape(labels[source.group_id]||source.group_id)}</span><h3>${escape(source.name)}</h3></div></div><p>${escape(source.description)}</p><div class="pc-source-badges"><span>Reference only</span><span class="${needsReview?'pc-license-review':''}">${escape(source.license)}${needsReview?' · review required':''}</span></div><p class="pc-source-boundary">${escape(source.review_notes)}</p><div class="pc-source-capabilities"><span>SUPPORTS REVIEW OF</span>${related.map(item=>`<a href="#pc-setup" data-install="${escape(item.slug)}">${escape(item.name)} ↗</a>`).join('')}</div><div class="pc-source-links"><a href="https://github.com/${escape(source.repository)}" target="_blank" rel="noopener">Your fork ↗</a><a href="https://github.com/${escape(source.upstream_repo)}/tree/${source.upstream_sha}" target="_blank" rel="noopener">Pinned upstream ↗</a></div></article>`;
    }).join('\n')
  };
}
