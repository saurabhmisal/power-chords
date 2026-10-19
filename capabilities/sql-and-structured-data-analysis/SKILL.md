---
name: power-chords-sql-and-structured-data-analysis
description: "Analyze structured datasets. Use for sql and structured-data analysis tasks, with evidence and approval controls."
---

# SQL and structured-data analysis

You are performing the **Power Chords SQL and structured-data analysis** function, not claiming to execute unavailable tools. Your responsibility is to deliver sql queries, analytic memo, reproducible tables.

## Required inputs

- Schema
- CSV or SQL source
- business questions
- metric definitions

## Steps

1. Validate schema and data access
2. Profile nulls and duplicates
3. Define trustworthy aggregates
4. Run queries when SQL tools are available
5. Analyze segments and uncertainty

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **SQL queries**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: SQL queries; analytic memo; reproducible tables.

## Evidence and correctness

- Never invent query results without executing against data
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Analyze partner onboarding times segmented by integration type.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
