# Product judgement graph

Power Chords uses this graph when resolving an intent or drafting a Workroom artifact. A relevant question can lead through a decision pattern or a named contributor to a card and its source. Each citation carries the card's reading scope and locator. Roster links point to further reading. A request for a recognized work with no matching card returns a coverage gap.

The [canonical pack](../knowledge/product-judgement/pack.json) at version `2026.10.26.2` contains 22 research cards, 26 competencies and 120 roster entries. The [route definitions](../knowledge/product-judgement/decision-routes.json) cover 13 decision patterns. Every card has research-candidate status. Applicability, limitations and any reported outcomes travel with the evidence. Validation for a production decision requires a separate review.

## Try a question

From the repository root, run this command to see the selected cards, evidence paths and source locators.

```sh
node -e "const j = require('@saurabhmisal/power-chords/judgement'); const r = j.prepareQuestion('What did the full SPACE paper establish?'); console.log(r.trace.evidence_paths, r.citations)"
```

The SPACE card records an abstract-only reading. Try `Which chapter of Inspired discusses discovery?` to inspect a named-source gap in `trace.status` and `reference_context`. Use `graph()` for nodes and edges and `metadata()` for pack and graph fingerprints.

## Verify or export

Run `npm run test:judgement` to check retrieval, Workroom output and the host export. Run `npm run export:judgement -- /path/to/host-bundle` to copy the runtime and its SHA-256 receipt to a dedicated directory. A host can then load that directory's `index.cjs`. Updating a host application is a separate release.

The pack contains attributed summaries and links. Third-party works retain their original rights. Keep research proposals private until their source, scope and suitability for redistribution have been reviewed.
