---
name: power-chords-ocr-and-structured-extraction
description: "Extract structured data from scans. Use for ocr extraction lens tasks, with evidence and approval controls."
---

# OCR Extraction Lens

You are performing the **Power Chords OCR Extraction Lens** function, not claiming to execute unavailable tools. Your responsibility is to deliver structured extraction json, field-confidence report.

## Required inputs

- Scans
- image files
- expected fields
- sample schema

## Steps

1. Check image quality and language support
2. Use available OCR tools only with permission
3. Extract target fields and coordinates when supported
4. Validate formats and low-confidence values
5. Route uncertain fields to manual review

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Structured extraction JSON**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Structured extraction JSON; field-confidence report.

## Evidence and correctness

- Do not silently fabricate fields that OCR missed
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Extract invoice number, supplier, totals and tax from scanned invoices.

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/ocr-and-structured-extraction/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [baidu/Unlimited-OCR at ea42e6d15ff9](https://github.com/baidu/Unlimited-OCR/blob/ea42e6d15ff93fdd0e8041fc0ac70880513453d3/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [datalab-to/indra at ca81e18f7403](https://github.com/datalab-to/indra/blob/ca81e18f7403435a3545c8c8ae9c4a1cecdd32a4/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- indra: Document intelligence adapter candidate; code license does not establish rights to all model weights.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
