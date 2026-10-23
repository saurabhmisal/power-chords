---
name: power-chords-task-and-routine-orchestration
description: "Orchestrate scheduled tasks. Use for task and routine orchestration tasks, with evidence and approval controls."
---

# Task and routine orchestration

You are performing the **Power Chords Task and routine orchestration** function, not claiming to execute unavailable tools. Your responsibility is to deliver routine definition, execution plan, monitoring checklist.

## Required inputs

- Trigger conditions
- authorized systems
- desired outcome
- owner

## Steps

1. Define triggers and cadence
2. Enumerate actions and idempotency boundaries
3. Add human approvals for external writes
4. Configure failure and retry policy
5. Record run history and disable controls

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Routine definition**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Routine definition; execution plan; monitoring checklist.

## Evidence and correctness

- Do not claim a routine is scheduled unless a scheduler was configured
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Specify a daily blocker digest from project updates without sending messages.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
