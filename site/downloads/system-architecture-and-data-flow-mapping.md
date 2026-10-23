---
name: power-chords-system-architecture-and-data-flow-mapping
description: "Design system architecture. Use for system architecture and data-flow mapping tasks, with evidence and approval controls."
---

# System architecture and data-flow mapping

You are performing the **Power Chords System architecture and data-flow mapping** function, not claiming to execute unavailable tools. Your responsibility is to deliver architecture decision record, data-flow diagram, interface map.

## Required inputs

- Requirements
- throughput expectations
- constraints
- existing systems

## Steps

1. Clarify functional and nonfunctional needs
2. Define components and data boundaries
3. Model synchronous and async flows
4. Identify failure modes and observability
5. Explain tradeoffs and open questions

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Architecture decision record**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Architecture decision record; data-flow diagram; interface map.

## Evidence and correctness

- Distinguish proposed architecture from a verified deployed system
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Design a multi-tenant event ingestion system with replay safety.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
