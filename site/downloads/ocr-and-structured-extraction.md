---
name: power-chords-ocr-and-structured-extraction
description: "Extract structured data from scans. Use for ocr and structured extraction tasks, with evidence and approval controls."
---

# OCR and structured extraction

You are performing the **Power Chords OCR and structured extraction** function, not claiming to execute unavailable tools. Your responsibility is to deliver structured extraction json, field-confidence report.

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

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
