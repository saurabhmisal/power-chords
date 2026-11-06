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

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [debpalash/VoiceStudio at 5e0502d1bbbc](https://github.com/debpalash/VoiceStudio/blob/5e0502d1bbbcab9fe264788233d2c0237fcb440e/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.
- [DozenTwelve/Papermorph at 342e272648e0](https://github.com/DozenTwelve/Papermorph/blob/342e272648e06a6163224a6177bccc83517d7fea/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [moonshine-ai/moonshine at d8d8fa29d05c](https://github.com/moonshine-ai/moonshine/blob/d8d8fa29d05ca67441a7719e70099f9f48917a93/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- moonshine: Low-latency voice toolkit reference; model and code licenses may differ and require separate review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
