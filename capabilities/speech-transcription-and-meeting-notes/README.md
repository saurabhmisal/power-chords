# Speech Transcription Scribe

> **Power Chords 39** · Voice & Media · **Codex workspace** — first-party local input-to-artifact execution with Codex reasoning and specialist processing where needed. Portable instructions require the host agent’s own tools.

Produce accurate meeting transcripts. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Produce accurate meeting transcripts. Use it to produce: timestamped transcript; decision log; follow-up list.

## Before you start

Provide the following information or explicitly mark it unknown:

- Audio with authorized recording consent
- languages
- diarization needs

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install speech-transcription-and-meeting-notes --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-speech-transcription-and-meeting-notes` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Speech Transcription Scribe** skill. Transcribe a recorded customer integration workshop and list commitments. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Confirm consent and access
2. Use a speech-to-text engine if available
3. Preserve timestamps and speaker uncertainty
4. Extract decisions and action items
5. Verify names and consequential claims

## Expected deliverables

- Timestamped transcript
- decision log
- follow-up list

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Never present fabricated transcript text or guessed speakers as facts
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

Run this capability in the private Codex workspace with `npm run preview:runtime`, after completing `npm run setup:runtime`. Select **Speech Transcription Scribe**, load its synthetic working example or supply your own evidence, and inspect files and execution receipts. See [runtime guide](../../docs/CODEX_RUNTIME.md) for inputs, limits and verification. The optional older Workroom drafting flows remain separate.

**Legacy Workroom classification:** `adapter_required`. This field describes the older drafting engine, not availability in the Codex workspace. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Visual walkthrough

![Speech Transcription Scribe illustrative workflow](../../assets/capability-demos/speech-transcription-and-meeting-notes.gif)

Illustrative process animation, not recorded runtime execution. [Open the Power Chords capability page](https://powerchords.lazo.tools/capabilities/speech-transcription-and-meeting-notes/) for motion controls and the complete workflow diagram.

## Workflow diagram

```mermaid
flowchart TD
  input["Your context and required inputs"]
  step0["Confirm consent and access"]
  step1["Use a speech-to-text engine if available"]
  step2["Preserve timestamps and speaker uncertainty"]
  step3["Extract decisions and action items"]
  step4["Verify names and consequential claims"]
  review["Review evidence and validate deliverables"]
  approval{"External action approved?"}
  finish["Deliver or publish approved result"]
  input --> step0
  step0 --> step1
  step1 --> step2
  step2 --> step3
  step3 --> step4
  step4 --> review
  review --> approval
  approval -- Yes --> finish
  approval -- Revise --> step0
```

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [debpalash/VoiceStudio at 5e0502d1bbbc](https://github.com/debpalash/VoiceStudio/blob/5e0502d1bbbcab9fe264788233d2c0237fcb440e/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.
- [DozenTwelve/Papermorph at 342e272648e0](https://github.com/DozenTwelve/Papermorph/blob/342e272648e06a6163224a6177bccc83517d7fea/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [moonshine-ai/moonshine at d8d8fa29d05c](https://github.com/moonshine-ai/moonshine/blob/d8d8fa29d05ca67441a7719e70099f9f48917a93/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the reviewed technical documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- moonshine: Low-latency voice toolkit reference; model and code licenses may differ and require separate review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
