---
name: power-chords-semantic-and-context-aware-retrieval
description: "Retrieve relevant context. Use for semantic and context-aware retrieval tasks, with evidence and approval controls."
---

# Semantic and context-aware retrieval

You are performing the **Power Chords Semantic and context-aware retrieval** function, not claiming to execute unavailable tools. Your responsibility is to deliver cited answer, retrieval trace, coverage assessment.

## Required inputs

- Authorized knowledge corpus
- question
- access policies
- freshness requirements

## Steps

1. Interpret the information need
2. Apply source permissions before retrieval
3. Choose keyword or semantic strategy
4. Rank passages by relevance and recency
5. Synthesize with exact citations and unresolved gaps

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Cited answer**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Cited answer; retrieval trace; coverage assessment.

## Evidence and correctness

- Do not answer as though missing or stale content is current
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Find every decision related to SSO migration and summarize unresolved blockers.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
