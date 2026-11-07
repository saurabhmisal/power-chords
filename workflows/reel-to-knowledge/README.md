# 🤘 ReverseReel · Power Chords

Turn a permitted Instagram Reel, YouTube Short, or local short video into **timestamped, searchable, source-attributed Markdown knowledge**. This is a composable workflow using Power Chords' existing transcription, OCR, document understanding and retrieval capabilities, not a 53rd headline capability.

## Compatibility

**Turn short videos into searchable knowledge**

Previously Reel → Knowledge. Existing installs, skill identifier `power-chords-reel-to-knowledge`, paths, `knowledge:*` commands, MCP configurations and storage stay supported. Ask for either name. Update existing installs with `--force`.

From the repository root: `npm run reversereel:install -- --agent codex --project /path/to/project`. Substitute claude, cursor or gemini, or use `--dest /path/to/skills`. Use Node.js 24.x for the full repository.

## What actually runs

- Local video inspection with `ffprobe`; strict 180-second and 150 MB limits.
- SRT, VTT, JSON or TXT transcript parsing, plus embedded subtitles where present.
- Optional offline speech recognition through Python `faster-whisper`; models may download during first-time setup.
- Optional sampled on-screen OCR via `ffmpeg` and Tesseract.
- Evidence-preserving extractive highlights (not an LLM-generated or verified summary).
- Markdown output, SHA-derived deduplication, local SQLite FTS5 indexing and keyword search.
- Optional user-approved export to an existing Obsidian or local knowledge-base directory.
- Optional public URL acquisition with `yt-dlp` only where accessible and permitted; no login cookies or private media bypass.

**Requirements:** Node.js >=22.13, `ffmpeg`, and `ffprobe` installed on the machine executing this skill. Optional: `tesseract`, `yt-dlp`, and `python3 -m pip install faster-whisper`. Local data lives in `.local/reel-knowledge` by default, configurable with `POWER_CHORDS_KB_DIR`.

## Install into your AI agent

Run from this folder:

```bash
node install.mjs --agent codex --project /path/to/your/project
# Or: --agent claude | cursor | gemini
# Or: --dest /path/to/your-agent-skills
```

This copies a self-contained instruction pack and local runtime. Restart the agent if it doesn't automatically discover new skills. This is also usable with other assistants that can read SKILL.md or invoke a terminal tool; those without execution tools can only follow its instructions, not process video themselves.

## Run with the CLI

```bash
node cli.mjs ingest --source ./reel.mp4 --transcript ./reel.srt
node cli.mjs ingest --source ./reel.mp4 --ocr        # captions or local faster-whisper required
node cli.mjs ingest --source 'https://www.youtube.com/shorts/VIDEO_ID'
node cli.mjs search --query 'onboarding'
node cli.mjs list
node cli.mjs note --id NOTE_ID
```

The CLI prints JSON including the generated Markdown note's absolute path. A second ingestion of the same extracted content returns `duplicate: true`.

## MCP: connect to compatible LLM clients

In a client that supports **local stdio MCP servers**, configure the command and arguments (substitute the installed absolute path):

```json
{
  "mcpServers": {
    "power-chords-reel-knowledge": {
      "command": "node",
      "args": ["/absolute/path/to/power-chords-reel-to-knowledge/mcp.mjs"],
      "env": { "POWER_CHORDS_KB_DIR": "/absolute/path/to/your/knowledge-base" }
    }
  }
}
```

Preferred tools: `reversereel_ingest`, `reversereel_search`, `reversereel_list`, `reversereel_read`. Legacy aliases: `reel_to_knowledge`, `search_reel_knowledge`, `list_reel_knowledge`, and `read_reel_knowledge`. MCP configuration formats differ by client and version; adapt the JSON to your tool's current documentation. This server speaks the JSON-RPC stdio subset used by MCP and does not require a proprietary model API.

## What to ask an agent

> Use ReverseReel on this authorized local video, extract timestamped highlights, and search my existing notes for related onboarding topics. Keep uncertain claims labeled and tell me where you saved the Markdown note.

## Security and limitations

- **Not every LLM can execute tools.** Compatibility requires local CLI access, agent skill support, or a working MCP client. Browser-only chat products may need a connected computer or plugin.
- Content is indexed locally and **not encrypted at rest**; don't use an untrusted or shared computer for sensitive media.
- Captions and model transcription can contain errors. Source assertions are not independently verified.
- You are responsible for media rights, authorization and platform terms. Private, paywalled, or DRM-protected content is not bypassed.
- There is no automatic Notion/Drive upload. Only explicitly requested local exports are performed.
- Generated highlights are extractive. There is no fabricated semantic understanding of visual actions or speaker identities.

Made as an original Power Chords workflow by Saurabh Misal. Optional underlying runtimes are provided by their respective maintainers under their licenses.
