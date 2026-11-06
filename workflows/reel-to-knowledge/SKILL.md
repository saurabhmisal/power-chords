---
name: power-chords-reel-to-knowledge
description: Turn authorized Instagram Reels, YouTube Shorts, or local short videos into searchable, timestamped Markdown notes using local tools.
---

# Reel → Knowledge

When the user wants to convert a video or reel into reusable knowledge:

1. Confirm they own or are permitted to process the media. Use the file they provide or a public, accessible Reel/Short link. Do not bypass access restrictions.
2. Verify Node.js 22.13+, `ffmpeg`, and `ffprobe`. For uncaptained audio, local Python `faster-whisper` is optional; OCR uses `tesseract`; public URLs use `yt-dlp`.
3. In this skill folder run: `node cli.mjs ingest --source '/absolute/path/to/reel.mp4' --transcript '/path/to/captions.srt'` (omit `--transcript` when auto captions or local STT are available). Always execute, not simulate.
4. To retrieve notes, use `node cli.mjs search --query 'topic'` and `node cli.mjs note --id NOTE_ID`.
5. Return extracted insights with source, timestamps, uncertain claims and note location. Never invent transcript or imply that reel claims are verified.
6. For agents supporting MCP, `node mcp.mjs` exposes ingest/search/list/read tools over stdio. See README.md for configuration and other agents.

The capability works locally and stores Markdown and a SQLite FTS5 index. It does not silently upload media or share it with a cloud model. Writing into a third-party knowledge vault requires the user's approval and an existing directory.
