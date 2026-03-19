#!/usr/bin/env python3
"""
Script para baixar áudios de uma playlist do YouTube e transcrever com Whisper.
"""

import subprocess
import os
import glob
import json
import sys

PLAYLIST_URL = "https://www.youtube.com/playlist?list=PL9ymgSAPJFid17GxrePYsJz31DU7bHPEr"
AUDIO_DIR = os.path.join(os.path.dirname(__file__), "transcricoes", "audios")
TEXT_DIR = os.path.join(os.path.dirname(__file__), "transcricoes", "textos")

os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(TEXT_DIR, exist_ok=True)


def baixar_audios():
    """Baixa apenas o áudio de todos os vídeos da playlist."""
    print("=" * 60)
    print("ETAPA 1: Baixando áudios da playlist...")
    print("=" * 60)
    cmd = [
        "yt-dlp",
        "-x",                          # extrair apenas áudio
        "--audio-format", "mp3",       # converter para mp3
        "--audio-quality", "5",        # qualidade média (menor arquivo)
        "-o", os.path.join(AUDIO_DIR, "%(playlist_index)03d - %(title)s.%(ext)s"),
        "--yes-playlist",
        "--no-overwrites",             # não re-baixar existentes
        PLAYLIST_URL,
    ]
    result = subprocess.run(cmd)
    if result.returncode != 0:
        print("AVISO: yt-dlp terminou com código", result.returncode)
    return sorted(glob.glob(os.path.join(AUDIO_DIR, "*.mp3")))


def transcrever(arquivos_audio):
    """Transcreve cada arquivo de áudio usando Whisper."""
    print("\n" + "=" * 60)
    print("ETAPA 2: Transcrevendo com Whisper...")
    print(f"Total de arquivos: {len(arquivos_audio)}")
    print("=" * 60)

    import whisper
    modelo = whisper.load_model("medium")
    print("Modelo 'medium' carregado.\n")

    for i, audio_path in enumerate(arquivos_audio, 1):
        nome = os.path.splitext(os.path.basename(audio_path))[0]
        txt_path = os.path.join(TEXT_DIR, f"{nome}.txt")

        # Pular se já transcrito
        if os.path.exists(txt_path) and os.path.getsize(txt_path) > 100:
            print(f"[{i}/{len(arquivos_audio)}] Já transcrito: {nome}")
            continue

        print(f"[{i}/{len(arquivos_audio)}] Transcrevendo: {nome}")
        try:
            result = modelo.transcribe(audio_path, language="pt", verbose=False)
            with open(txt_path, "w", encoding="utf-8") as f:
                f.write(f"# {nome}\n\n")
                f.write(result["text"])
            print(f"  -> Salvo em: {txt_path}")
        except Exception as e:
            print(f"  ERRO ao transcrever {nome}: {e}")

    print("\n" + "=" * 60)
    print("CONCLUÍDO!")
    print(f"Transcrições salvas em: {TEXT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    audios = baixar_audios()
    if not audios:
        print("Nenhum áudio encontrado. Verifique se o download funcionou.")
        sys.exit(1)
    transcrever(audios)
