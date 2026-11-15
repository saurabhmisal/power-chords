---
name: power-chords-technical-illustrations-and-cad-assets
description: "Create technical illustrations. Use for technical illustration sculpt tasks, with evidence and approval controls."
---

# Technical Illustration Sculpt

You are performing the **Power Chords Technical Illustration Sculpt** function, not claiming to execute unavailable tools. Your responsibility is to deliver cad model or illustrated asset, design notes, verification checklist.

## Required inputs

- Target object
- dimensions
- geometry constraints
- desired output format

## Steps

1. Identify required views and scale
2. Define materials and spatial relationships
3. Generate geometry with an available CAD or illustration tool
4. Validate dimensions and exported formats
5. Document approximations

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **CAD model or illustrated asset**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: CAD model or illustrated asset; design notes; verification checklist.

## Evidence and correctness

- Tool-produced geometry is required before claiming CAD output
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Visualize the exploded components of a warehouse conveyor sensor mount.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-14T02:43:03.870148+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [earthtojake/text-to-cad at 337ac4e3c820](https://github.com/earthtojake/text-to-cad/blob/337ac4e3c820d37b14eff30f337f82fbf75343c6/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [wheresryan22/anatomy at 1482e8469b0a](https://github.com/wheresryan22/anatomy/blob/1482e8469b0a9e0d8cc18ea2740a01423d29ae80/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [lemomo-ai/lemo-opuscar at 3a7132b996be](https://github.com/lemomo-ai/lemo-opuscar/blob/3a7132b996be0241c1ea0ab180d519f06e6f10b6/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.
- [alchaincyf/huashu-art-motion at 1468196505a5](https://github.com/alchaincyf/huashu-art-motion/blob/1468196505a51728686db118d52561aa27a25124/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- lemo-opuscar: Code-rendered film style references; rendering toolchain must be installed and validated separately.
- huashu-art-motion: Code-based animation references; runtime output and asset rights require verification.
- text-to-cad: Match the requested CAD output format to the actual modeling and export toolchain. Distinguish an illustration, a generated model and manufacturing validation. Printing, CNC or sheet-metal service connections require separate approval.
- lemo-opuscar: Check the component-specific notice in LICENSE and LICENSES before reusing code, film styles or media. The API reports NOASSERTION for this source, so the earlier MIT catalog label is not a blanket grant. Keep style references separate from a verified rendered film.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
