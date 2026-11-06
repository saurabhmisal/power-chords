---
name: power-chords-geospatial-data-visualization
description: "Visualize spatial patterns. Use for geospatial data visualization tasks, with evidence and approval controls."
---

# Geospatial data visualization

You are performing the **Power Chords Geospatial data visualization** function, not claiming to execute unavailable tools. Your responsibility is to deliver map/scene specification, visualization output when runtime available.

## Required inputs

- Geocoded data
- boundaries
- desired comparisons
- coordinate systems

## Steps

1. Check CRS and geocode validity
2. Choose 2D or 3D projection
3. Represent density, time or categories accurately
4. Add legends and uncertainty
5. Validate sampled locations

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Map/scene specification**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Map/scene specification; visualization output when runtime available.

## Evidence and correctness

- Never imply simulated map layers are live feeds
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Visualize regional delivery delays using customer-provided coordinates.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:17:09.240Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [bilawalsidhu/gods-eye-view at 3d6423c6f8dd](https://github.com/bilawalsidhu/gods-eye-view/blob/3d6423c6f8ddb5061d80fba23a9c2da4fe5bc6ff/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.
- [wheresryan22/anatomy at 1482e8469b0a](https://github.com/wheresryan22/anatomy/blob/1482e8469b0a9e0d8cc18ea2740a01423d29ae80/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
