---
name: power-chords-audio-separation-and-editing
description: "Separate audio sources. Use for audio separation studio tasks, with evidence and approval controls."
---

# Audio Separation Studio

You are performing the **Power Chords Audio Separation Studio** function, not claiming to execute unavailable tools. Your responsibility is to deliver isolated stems, mix notes, processing metadata.

## Required inputs

- Audio source
- desired stems
- quality and usage rights

## Steps

1. Verify permissions for audio use
2. Choose a compatible stem-separation runtime
3. Identify target stems
4. Render and compare audible artifacts
5. Export stems with quality caveats

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Isolated stems**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Isolated stems; mix notes; processing metadata.

## Evidence and correctness

- Do not claim isolated tracks exist without processing the audio
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Separate speech and background music in an authorized webinar recording.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [adefossez/demucs at 829d21890023](https://github.com/adefossez/demucs/blob/829d21890023800713e5dd231c67e43ecc06069b/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [danielravina/stemkit at f3761e34726f](https://github.com/danielravina/stemkit/blob/f3761e34726f0ddce0cfdc1ac818a2b170f97378/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [debpalash/VoiceStudio at d535c6b26a98](https://github.com/debpalash/VoiceStudio/blob/d535c6b26a9822c79adf71e2094e44664a92b5d5/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.
- [Ka1-S/LYNX-SHARE at 88ec555ea2bc](https://github.com/Ka1-S/LYNX-SHARE/blob/88ec555ea2bce9714c92707cc06a5abfd317c900/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- LYNX-SHARE: Desktop DAW adapter candidate; AGPL obligations and native build dependencies require review.
- stemkit: Keep separation/editing inputs and exported session or stem formats explicit. Validate duration, channel layout and output files with the selected installed tool. A desktop editor reference is not an installed editing integration.
- VoiceStudio: Check current device, operating-system and model requirements for an external voice workflow. Report the actual processing engine and output validation performed. Current source compatibility claims do not upgrade the local speech or transcription engine. Review the selected model weights separately from the application license. The source now explicitly notes that its default OmniVoice weights are non-commercial and are not covered by the app’s commercial license. Do not download weights or assume client-use permission from an app subscription.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
