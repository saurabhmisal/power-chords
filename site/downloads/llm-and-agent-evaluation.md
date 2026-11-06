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

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [openai/evals at 8eac7a7de521](https://github.com/openai/evals/blob/8eac7a7de5215c907fbddc30efdaf316913eccdd/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.
- [affaan-m/ECC at b38be6a7f635](https://github.com/affaan-m/ECC/blob/b38be6a7f6350964d59328b52f0624e1d1d552d1/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [Shubhamsaboo/awesome-llm-apps at c129f31036f5](https://github.com/Shubhamsaboo/awesome-llm-apps/blob/c129f31036f5ba0bba42cbb63937a66946fdf2c0/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Separate planning, code review, execution tests and staging QA. Report the actual commands or environments used and retain failures rather than treating an instruction pack as test evidence.
- awesome-llm-apps: Example-agent and RAG patterns; examples are not preconfigured or security-reviewed Power Chords integrations.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
