# Design skill guidance cleanup: 15 November 2026

Status: repository draft awaiting approval before publication. The owner explicitly requested this cleanup in the three installed Codex skills now, with a preview before any GitHub or website publication. This local installation authorization does not authorize publication.

Baseline: `0809c7cba3d1b82cdbf54b7d83626eafe0385857`. The changes are isolated on local branch `draft/design-guidance-dedup-20261115`.

| Skill | Astryx notes | Impeccable notes |
|---|---|---|
| App Prototyping Foundry | 2 → 1 | 2 → 1 |
| UX Wireframing Canvas | 2 → 1 | 2 → 1 |
| Interactive Prototyping Playground | 2 → 1 | 2 → 1 |

## Consolidated instructions

- astryx: For a requested React interface, check React 19 compatibility, the scoped @astryxdesign/cli package and component documentation before using components or templates. Verify theming, keyboard interaction, rendered states and template output. The isolated HTML preview does not install React or Astryx.

- impeccable: Scope critique, accessibility and deterministic interface checks to a named surface. Verify proposed fixes in the rendered result. Installing hooks or downloading its engine requires separate review. Do not invoke the live-copy fallback that disables approvals. Preserve Codex approval and isolation.

Each pair of overlapping notes becomes one combined note. Unique requirements are retained, including component documentation, template output, React 19 compatibility, the scoped CLI package, theming, keyboard interaction, rendered states, accessibility, separate review for hook/engine setup, the prohibition on the approval-disabling fallback, and Codex isolation. No integration is installed by this cleanup.

## Proposed repository changes

Update only the three capabilities' source-guidance arrays in data/capability-guides.json. Regenerate their SKILL.md, README.md and capability.json files, plus their three website Markdown downloads. Other capability instructions, names, IDs, workflow steps, output requirements, examples, references, licenses, weekly notes and runtime code are preserved. GIFs and workflow definitions are unchanged, so assets are retained.

This proposal is the only additional review document. There are no new upstream pulls, dependencies, installers, tests or runtime features in this change. The older weekly drafts and synced sources are untouched.

## Local Codex installation

Back up and update only the three named personal Codex installations. Keep portable links, attribution, license notices and the published base revision. Mark the cleanup as a locally applied unpublished override in each .power-chords-install.json record, with new file hashes and the draft proposal path. Preserve the other 31 installed Power Chords skills byte for byte.

Future weekly updates must preserve this local override until it is included in an approved published revision or explicitly superseded by the owner. Do not silently restore the duplicated instructions from the older published commit.

## Validation and publication gate

Catalog and capability validators and both static/hosted website builds passed. Check that each of the three skills has exactly one guidance entry per named source, all non-target source guidance and capability fields are unchanged, installed skill frontmatter and hashes validate, and other installed skills remain unchanged. Diff whitespace checks must pass.

This is a documentation-only cleanup. No live model or third-party execution checks are needed. No GitHub branch, pull request, release, deployment or public website update is authorized. Obtain approval of this proposal before publication, then recheck current remote main and the saved diff. After approved publication, reconcile the three local override records to the exact published revision.
