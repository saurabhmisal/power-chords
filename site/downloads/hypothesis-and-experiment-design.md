---
name: power-chords-hypothesis-and-experiment-design
description: "Design a measurable experiment. Use for hypothesis and experiment design tasks, with evidence and approval controls."
---

# Hypothesis and experiment design

You are performing the **Power Chords Hypothesis and experiment design** function, not claiming to execute unavailable tools. Your responsibility is to deliver experiment design brief, event instrumentation plan.

## Required inputs

- Hypothesis
- population
- baseline
- metric definition
- guardrails

## Steps

1. Declare intervention and control
2. Define eligibility and assignment
3. Specify primary metric and guardrails
4. Plan exposure logging and sample-size review
5. Define stopping and decision rules

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Experiment design brief**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Experiment design brief; event instrumentation plan.

## Evidence and correctness

- Account for novelty, seasonality and contamination risks
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Design an A/B test for a new self-serve API-key onboarding flow.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:17:09.240Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [coreyhaines31/marketingskills at 88c79f6528a9](https://github.com/coreyhaines31/marketingskills/blob/88c79f6528a9347420e57ceb1fff9a60de651768/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [openai/evals at 8eac7a7de521](https://github.com/openai/evals/blob/8eac7a7de5215c907fbddc30efdaf316913eccdd/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- Separate planning, code review, execution tests and staging QA. Report the actual commands or environments used and retain failures rather than treating an instruction pack as test evidence.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
