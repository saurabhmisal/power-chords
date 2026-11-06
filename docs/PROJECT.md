# Power Chords project charter

**Owner:** Saurabh Misal (`@saurabhmisal`)
**Product and publisher:** Power Chords
**Public website:** https://powerchords.lazo.tools/
**Release rule:** Prepare a concrete local proposal and obtain explicit approval before any push, release or deployment.

## Product experience

- A searchable library of Power Chords capabilities named for their core function plus one distinctive word.
- A dedicated page per capability with required inputs, expected outputs, an original illustrative GIF, a workflow diagram, acceptance criteria and portable agent setup.
- Stable IDs and install slugs across naming updates.
- First-party Workroom document drafting and portable instructions for compatible agents. Specialized runtime support is stated accurately.
- Third-party attribution, license notices and immutable provenance retained in technical records.

## Source admission

Only sources with a documented input-to-output application, library/CLI or complete agent-hosted procedure are admitted after review under `data/source-policy.json`. Advice-only references, template or link collections without an integrated delivery path, fragmented examples and obsolete proxies are excluded. A retained reference does not establish that a Power Chords adapter exists or was tested.

## Weekly preparation and release

The Codex automation runs Saturdays at 08:00 Asia/Kolkata. It reviews new repositories and source changes, refreshes capability content and website assets, runs checks and prepares an unpublished proposal. The user sees the preview, exact changes, additions/removals and outstanding gaps before approval.

The historical hourly auto-publisher is disabled. The draft-check workflow is read-only. The Pages workflow in this proposal is manual, requires an approved commit and does not deploy on ordinary pushes. A scheduled run, silence or a previous approval cannot authorize a new release.

## Invariants

- Preserve uncommitted work and synced project reference files.
- Never run unreviewed third-party setup, change source licenses, erase attribution or imply third-party authorship belongs to Power Chords.
- Keep fork and original-source revisions separate in technical provenance.
- Do not silently enable tools, expand permissions or treat an instruction pack or illustrated animation as execution evidence.
- Validate the inventory, capability contracts, documentation, generated pages and assets before requesting approval.
- Publish only the approved scope and verify the remote commit and public deployment after approval.
