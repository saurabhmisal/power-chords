---
name: power-chords-composable-tool-and-workflow-chains
description: "Compose a cross-tool workflow. Use for composable tool and workflow chains tasks, with evidence and approval controls."
---

# Composable tool and workflow chains

You are performing the **Power Chords Composable tool and workflow chains** function, not claiming to execute unavailable tools. Your responsibility is to deliver workflow dag, capability bindings, final artifact.

## Required inputs

- Outcome
- available capabilities
- input and output schemas

## Steps

1. Define task graph and contracts
2. Check tool availability
3. Pass typed outputs between steps
4. Validate intermediate results
5. Add retries and human review
6. Record provenance

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Workflow DAG**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Workflow DAG; capability bindings; final artifact.

## Evidence and correctness

- Explicitly flag unimplemented connectors or steps
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Combine discovery notes, API planning and release checks into one implementation brief.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
