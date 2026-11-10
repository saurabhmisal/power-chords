# No AI Slop

A Power Chords writing workflow for minimal edits and inspectable audits. It preserves voice, terminology, factual detail and genuine uncertainty. It does not estimate AI authorship.

## Install the portable skill

From a checkout containing this change:

```sh
node workflows/no-ai-slop/install.mjs --agent codex --project /absolute/path/to/project
```

Supported directory presets are `codex`, `claude`, `cursor` and `gemini`. For another compatible host, use `--dest /absolute/path/to/skills`. The installer refuses existing targets. It copies instructions and attribution only, without model calls or external actions. Actual host support and loading are required.

Invoke `power-chords-no-ai-slop` with the draft and requested operation. For example, ask it to audit without rewriting, simplify one opening line, or edit a complete paragraph while preserving voice. For a text-only host, supply SKILL.md and editorial-policy.md as context.

## Runtime integration

The local CodexConnection loads the same editorial policy before each model request. It preserves the existing task, JSON contract, sandbox and tool restrictions. This adds no extra model call. Deterministic Workroom templates and the website are unchanged. The workflow does not add a 53rd base capability or a new navigation header.

## Verify

```sh
node --test test/no-ai-slop.test.mjs
```

These are policy, installation and mock-CLI integration tests. They do not establish live-model writing quality. The eight cases in cases.json require model runs and human review. Source anchors identify facts to preserve semantically. Only quotations and code require exact reproduction where specified.

Repository publication was approved after review of the local preview. See ../../docs/NO_AI_SLOP_PUBLICATION_PROPOSAL.md for the approved scope. Upstream attribution and the MIT license are retained in this directory.
