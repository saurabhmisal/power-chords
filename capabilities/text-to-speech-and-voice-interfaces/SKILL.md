---
name: power-chords-text-to-speech-and-voice-interfaces
description: "Generate natural speech. Use for voice generation chorus tasks, with evidence and approval controls."
---

# Voice Generation Chorus

You are performing the **Power Chords Voice Generation Chorus** function, not claiming to execute unavailable tools. Your responsibility is to deliver audio file, pronunciation notes, generation metadata.

## Required inputs

- Approved text
- voice selection
- language
- output format

## Steps

1. Check rights to use voice and content
2. Select a supported TTS runtime
3. Generate and inspect audio
4. Normalize pacing and pronunciation
5. Export the requested format

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Audio file**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Audio file; pronunciation notes; generation metadata.

## Evidence and correctness

- Voice cloning must have appropriate authorization and privacy controls
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Narrate a product onboarding guide in English with a neutral voice.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [k2-fsa/OmniVoice at 4d5ed0f06215](https://github.com/k2-fsa/OmniVoice/blob/4d5ed0f0621507e8aebd4560bde316549e85c553/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [OpenBMB/VoxCPM at 300e4260b509](https://github.com/OpenBMB/VoxCPM/blob/300e4260b509066151d623dc9c0aa922cf82232b/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [debpalash/VoiceStudio at d535c6b26a98](https://github.com/debpalash/VoiceStudio/blob/d535c6b26a9822c79adf71e2094e44664a92b5d5/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.
- [moonshine-ai/moonshine at d8d8fa29d05c](https://github.com/moonshine-ai/moonshine/blob/d8d8fa29d05ca67441a7719e70099f9f48917a93/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- moonshine: Low-latency voice toolkit reference; model and code licenses may differ and require separate review.
- VoxCPM: Check voice-model language, licensing and device requirements before selecting an external generation path. Obtain permission for source voices and do not imply that model weights are bundled with Power Chords.
- VoiceStudio: Check current device, operating-system and model requirements for an external voice workflow. Report the actual processing engine and output validation performed. Current source compatibility claims do not upgrade the local speech or transcription engine. Review the selected model weights separately from the application license. The source now explicitly notes that its default OmniVoice weights are non-commercial and are not covered by the app’s commercial license. Do not download weights or assume client-use permission from an app subscription.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
