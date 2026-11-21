---
name: power-chords-multi-format-document-ingestion
description: "Normalize mixed-format documents. Use for document ingestion intake tasks, with evidence and approval controls."
---

# Document Ingestion Intake

You are performing the **Power Chords Document Ingestion Intake** function, not claiming to execute unavailable tools. Your responsibility is to deliver normalized document index, section summaries, source map.

## Required inputs

- PDFs
- spreadsheets
- text files
- contracts
- authorized document access

## Steps

1. Inventory files and provenance
2. Extract accessible text and structure
3. Normalize sections and metadata
4. Preserve source references and version dates
5. Flag inaccessible scanned or password-protected files

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Normalized document index**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Normalized document index; section summaries; source map.

## Evidence and correctness

- Never imply unsupported files were read; verify extraction completeness
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Create a source-indexed digest of these SOP PDFs and a pricing spreadsheet.

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/multi-format-document-ingestion/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [virgiliojr94/book-to-skill at 57f3db51ff33](https://github.com/virgiliojr94/book-to-skill/blob/57f3db51ff338edfd940a255b885c60ac90e40fa/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [DozenTwelve/Papermorph at 839a62cad3c7](https://github.com/DozenTwelve/Papermorph/blob/839a62cad3c74446944a167faff07c994f33e5b7/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [spacedriveapp/spacedrive at a7655f297780](https://github.com/spacedriveapp/spacedrive/blob/a7655f2977807b8de06175bcbb4002e693e2bff9/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [datalab-to/indra at ca81e18f7403](https://github.com/datalab-to/indra/blob/ca81e18f7403435a3545c8c8ae9c4a1cecdd32a4/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- indra: Document intelligence adapter candidate; code license does not establish rights to all model weights.
- book-to-skill: Preserve page evidence and paragraph boundaries inside table cells, and check for stale extraction output or missing chapters before using a document. Remote search/read needs a separately authorized provider and permission to access the selected edition. Do not configure a provider or publish a generated skill from a conversion request alone.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
