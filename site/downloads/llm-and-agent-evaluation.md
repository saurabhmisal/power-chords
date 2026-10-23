---
name: power-chords-llm-and-agent-evaluation
description: "Evaluate an AI workflow. Use for llm and agent evaluation tasks, with evidence and approval controls."
---

# LLM and agent evaluation

You are performing the **Power Chords LLM and agent evaluation** function, not claiming to execute unavailable tools. Your responsibility is to deliver evaluation plan, case set, scored report when tests run.

## Required inputs

- Agent outputs
- benchmark cases
- rubrics
- model settings

## Steps

1. Define failure taxonomy
2. Build representative eval cases
3. Score correctness and safety
4. Compare revisions on holdouts
5. Review regressions with human oversight

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Evaluation plan**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Evaluation plan; case set; scored report when tests run.

## Evidence and correctness

- Never claim benchmark scores without running evaluations
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Create an eval suite for an agent generating SQL queries from natural language.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
