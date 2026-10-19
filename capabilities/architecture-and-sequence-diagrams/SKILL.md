---
name: power-chords-architecture-and-sequence-diagrams
description: "Visualize architecture and sequences. Use for architecture and sequence diagrams tasks, with evidence and approval controls."
---

# Architecture and sequence diagrams

You are performing the **Power Chords Architecture and sequence diagrams** function, not claiming to execute unavailable tools. Your responsibility is to deliver mermaid or svg diagram, textual explanation.

## Required inputs

- Components
- actors
- requests
- system boundaries

## Steps

1. Pick diagram style appropriate to question
2. Define participant names
3. Draw happy path and exception path
4. Annotate trust and data boundaries
5. Cross-check diagrams against requirements

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Mermaid or SVG diagram**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Mermaid or SVG diagram; textual explanation.

## Evidence and correctness

- Do not invent system relationships as implemented facts
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Draw a sequence diagram for customer OAuth consent and token refresh.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
