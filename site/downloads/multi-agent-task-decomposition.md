---
name: power-chords-multi-agent-task-decomposition
description: "Break complex work into agent tasks. Use for multi-agent task decomposition tasks, with evidence and approval controls."
---

# Multi-agent task decomposition

You are performing the **Power Chords Multi-agent task decomposition** function, not claiming to execute unavailable tools. Your responsibility is to deliver task dependency graph, agent briefs, integration checklist.

## Required inputs

- Goal
- deliverable
- available tools
- permissions
- deadlines

## Steps

1. Define success criteria
2. Decompose independent and dependent tasks
3. Assign clear contracts to specialist agents
4. Establish checkpoints and escalation
5. Reconcile outputs into one decision

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Task dependency graph**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Task dependency graph; agent briefs; integration checklist.

## Evidence and correctness

- Do not delegate access beyond the operator's permissions
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Plan research, design and prototype tasks across three specialist agents.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
