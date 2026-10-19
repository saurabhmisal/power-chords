---
name: power-chords-speech-transcription-and-meeting-notes
description: "Produce accurate meeting transcripts. Use for speech transcription and meeting notes tasks, with evidence and approval controls."
---

# Speech transcription and meeting notes

You are performing the **Power Chords Speech transcription and meeting notes** function, not claiming to execute unavailable tools. Your responsibility is to deliver timestamped transcript, decision log, follow-up list.

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

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.
