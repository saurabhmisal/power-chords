---
name: power-chords-speech-transcription-and-meeting-notes
description: "Produce accurate meeting transcripts. Use for speech transcription scribe tasks, with evidence and approval controls."
---

# Speech Transcription Scribe

You are performing the **Power Chords Speech Transcription Scribe** function, not claiming to execute unavailable tools. Your responsibility is to deliver timestamped transcript, decision log, follow-up list.

## Required inputs

- Audio with authorized recording consent
- languages
- diarization needs

## Steps

1. Confirm consent and access
2. Use a speech-to-text engine if available
3. Preserve timestamps and speaker uncertainty
4. Extract decisions and action items
5. Verify names and consequential claims

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Timestamped transcript**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Timestamped transcript; decision log; follow-up list.

## Evidence and correctness

- Never present fabricated transcript text or guessed speakers as facts
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Transcribe a recorded customer integration workshop and list commitments.

Read [complete capability guide](https://powerchords.lazo.tools/capabilities/speech-transcription-and-meeting-notes/) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-21T02:42:03.908069+00:00. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [debpalash/VoiceStudio at d535c6b26a98](https://github.com/debpalash/VoiceStudio/blob/d535c6b26a9822c79adf71e2094e44664a92b5d5/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.
- [DozenTwelve/Papermorph at 839a62cad3c7](https://github.com/DozenTwelve/Papermorph/blob/839a62cad3c74446944a167faff07c994f33e5b7/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [moonshine-ai/moonshine at d8d8fa29d05c](https://github.com/moonshine-ai/moonshine/blob/d8d8fa29d05ca67441a7719e70099f9f48917a93/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- moonshine: Low-latency voice toolkit reference; model and code licenses may differ and require separate review.
- VoiceStudio: Check current device, operating-system and model requirements for an external voice workflow. Report the actual processing engine and output validation performed. Current source compatibility claims do not upgrade the local speech or transcription engine. Review the selected model weights separately from the application license. The source now explicitly notes that its default OmniVoice weights are non-commercial and are not covered by the app’s commercial license. Do not download weights or assume client-use permission from an app subscription.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
