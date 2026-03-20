# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for Prof. Henrique Elfes — a philosophy professor. The site hosts his free course "Pequena História das Grandes Ideias" (3 modules, 17 lessons with YouTube videos and Google Drive PDFs), promotes his paid course "Travessia", and includes a student Q&A system. All content is in Brazilian Portuguese.

## Development

```bash
npm run dev        # starts Express server on localhost:3000
```

No build step, no tests, no linter. The site is plain HTML/CSS/JS served statically by Express, deployed to Vercel.

## Architecture

- **Frontend**: Static files in `public/` — HTML pages, `css/style.css`, `js/script.js`. No framework, no bundler.
- **Backend (local)**: `server.js` — Express server that serves `public/` as static root and handles the `/api/duvidas` endpoint. Stores data in `db/duvidas.json`.
- **Backend (Vercel)**: `api/duvidas.js` — Vercel serverless function, same logic as server.js but uses `/tmp/duvidas.json` (ephemeral storage). Configured via `vercel.json`.
- **Transcription tool**: `tools/transcrever.py` — standalone Python script that downloads audio from a YouTube playlist via `yt-dlp` and transcribes with OpenAI Whisper. Outputs to `Cursos/HF/transcricoes/`.
- **Course content**: `Cursos/` — organized by course: PHGI, HF, GR, TRV.

## API Endpoints

- `POST /api/duvidas` — submit a student question (no auth)
- `GET /api/duvidas?senha=<password>` — list all questions (admin)
- `GET /api/duvidas?senha=<password>&format=csv` — export as CSV (admin)

Admin password defaults to env var `ADMIN_PASSWORD`, fallback `elfes2025`.

## Content Data

`Cursos/PHGI/modulos.md` contains all YouTube video links and Google Drive PDF links for the 3 course modules. This is the source of truth for lesson URLs used across the site.
