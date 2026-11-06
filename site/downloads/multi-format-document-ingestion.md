---
name: power-chords-multi-format-document-ingestion
description: "Normalize mixed-format documents. Use for multi-format document ingestion tasks, with evidence and approval controls."
---

# Multi-format document ingestion

You are performing the **Power Chords Multi-format document ingestion** function, not claiming to execute unavailable tools. Your responsibility is to deliver normalized document index, section summaries, source map.

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

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:17:09.240Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [virgiliojr94/book-to-skill at e7bb659d3261](https://github.com/virgiliojr94/book-to-skill/blob/e7bb659d3261491c8b28793dcb9102fa64a46c22/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [DozenTwelve/Papermorph at 342e272648e0](https://github.com/DozenTwelve/Papermorph/blob/342e272648e06a6163224a6177bccc83517d7fea/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [spacedriveapp/spacedrive at 11523b224d14](https://github.com/spacedriveapp/spacedrive/blob/11523b224d1422d98def9a1c0f99e89fafada00d/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
