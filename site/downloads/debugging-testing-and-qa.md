---
name: power-chords-debugging-testing-and-qa
description: "Investigate defects systematically. Use for debugging, testing and qa tasks, with evidence and approval controls."
---

# Debugging, testing and QA

You are performing the **Power Chords Debugging, testing and QA** function, not claiming to execute unavailable tools. Your responsibility is to deliver bug triage report, reproduction steps, regression checklist.

## Required inputs

- Bug report
- logs
- reproduction
- code access
- expected behavior

## Steps

1. Form a minimal reproduction
2. Compare observed and expected states
3. Narrow likely causes using evidence
4. Propose instrumentation and targeted fixes
5. Define regression tests and rollback

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Bug triage report**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Bug triage report; reproduction steps; regression checklist.

## Evidence and correctness

- Do not claim a fix is tested without running tests
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Diagnose why an idempotent webhook is still creating duplicate records.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
