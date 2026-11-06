---
name: power-chords-rapid-application-prototyping
description: "Prototype an application. Use for rapid application prototyping tasks, with evidence and approval controls."
---

# Rapid application prototyping

You are performing the **Power Chords Rapid application prototyping** function, not claiming to execute unavailable tools. Your responsibility is to deliver prototype source, run instructions, known limitations.

## Required inputs

- Problem statement
- users
- preferred stack
- feature scope

## Steps

1. Constrain the smallest useful slice
2. Draft UI and data entities
3. Generate runnable scaffolding when coding tools are available
4. Implement representative happy and error paths
5. Explain setup, test and missing integrations

## Output contract

Return sections titled **Result**, **Supporting evidence**, **Assumptions and unknowns**, **Prototype source**, **Validation**, and **Next actions**. Include all appropriate additional deliverables: Prototype source; run instructions; known limitations.

## Evidence and correctness

- Do not call mock data a production backend
- Never invent citations, numeric results, user approvals, actions taken or generated files.
- If necessary tools are missing, explain the blocker and provide a bounded plan rather than inventing results.
- Get explicit approval for external writes, payments, publication, deletion, or deployment.

## Example invocation

Create a minimal dashboard for viewing delivery exceptions by partner.

Read [README.md](README.md) for complete instructions, compatibility and a review checklist.

## Reviewed upstream references

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [addyosmani/agent-skills at 301b02b12bff](https://github.com/addyosmani/agent-skills/blob/301b02b12bff98e4688e6984af6556802322bbde/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EnzeD/vibe-coding at 8b650568ea41](https://github.com/EnzeD/vibe-coding/blob/8b650568ea41515950f75bee255d03ac96db8e62/README.md) — catalog license: UNKNOWN; reference only, adapter execution not verified.
- [chrishayuk/vibe-coding-templates at a58fadee8027](https://github.com/chrishayuk/vibe-coding-templates/blob/a58fadee8027cfa620cad79c714fbd7132432d90/README.md) — catalog license: UNKNOWN; reference only, adapter execution not verified.
- [codecrafters-io/build-your-own-x at aa17439b62f3](https://github.com/codecrafters-io/build-your-own-x/blob/aa17439b62f384511a5561ce308e9598b94d8989/README.md) — catalog license: UNKNOWN; reference only, adapter execution not verified.
- [KonstantinKai/reelkit at 0a9829aa4ad2](https://github.com/KonstantinKai/reelkit/blob/0a9829aa4ad2eccaa006573085587b2c33f8afe3/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EveryInc/compound-engineering-plugin at 173bd337fa63](https://github.com/EveryInc/compound-engineering-plugin/blob/173bd337fa639aac19ce7363d288836a074231a5/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [21st-dev/magic-mcp at 6b5299e8a83c](https://github.com/21st-dev/magic-mcp/blob/6b5299e8a83ceffa73d4fc4e148905bb3eeeeb55/README.md) — catalog license: ISC; reference only, adapter execution not verified.
- [multica-ai/andrej-karpathy-skills at 2c606141936f](https://github.com/multica-ai/andrej-karpathy-skills/blob/2c606141936f1eeef17fa3043a72095b4765b9c2/README.md) — catalog license: UNKNOWN; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- reelkit: Touch-first slider library reference; accessibility and input behavior need integration tests.
- compound-engineering-plugin: Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.
- magic-mcp: Legacy compatibility proxy: upstream recommends the 21st MCP; verify current setup rather than copying obsolete commands.
- andrej-karpathy-skills: Coding behavior guidance; attribution and license require review before copying instruction text.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](https://github.com/saurabhmisal/power-chords/blob/main/docs/UPSTREAM_REFRESH.md) for scope and reproduction.
