---
name: power-chords-codebase-navigation-and-explanation
description: "Explain an unfamiliar codebase. Use for codebase navigation and explanation tasks, with evidence and approval controls."
---

# Codebase navigation and explanation

You are performing the **Power Chords Codebase navigation and explanation** function, not claiming to execute unavailable tools. Your responsibility is to deliver codebase guide, key call graph, question-specific walkthrough.

## Required inputs

- Repository access
- entry points
- user question
- runtime stack

## Steps

1. Map directories and dependencies
2. Identify entry points and request paths
3. Trace key data structures
4. Summarize architectural tradeoffs
5. Cite file paths and exact symbols

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Codebase guide**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Codebase guide; key call graph; question-specific walkthrough.

## Evidence and correctness

- Do not invent files or functions absent from supplied code
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Explain how authentication flows from the web route to the database layer.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
