#!/usr/bin/env python3
"""
Script para transcrever áudios já baixados do curso História da Filosofia (HF).
Os áudios já estão em Cursos/HF/transcricoes/audios/.
Apenas executa a transcrição com Whisper.
"""

import os
import glob
import sys

BASE_DIR = os.path.join(os.path.dirname(__file__), "..", "Cursos", "HF", "transcricoes")
AUDIO_DIR = os.path.join(BASE_DIR, "audios")
TEXT_DIR = os.path.join(BASE_DIR, "textos")

os.makedirs(TEXT_DIR, exist_ok=True)


def transcrever(arquivos_audio):
    """Transcreve cada arquivo de áudio usando Whisper."""
    print("=" * 60)
    print("Transcrevendo áudios do curso História da Filosofia (HF)")
    print(f"Total de arquivos: {len(arquivos_audio)}")
    print("=" * 60)

    import whisper
    modelo = whisper.load_model("medium")
    print("Modelo 'medium' carregado.\n")

    transcritos = 0
    pulados = 0

    for i, audio_path in enumerate(arquivos_audio, 1):
        nome = os.path.splitext(os.path.basename(audio_path))[0]
        txt_path = os.path.join(TEXT_DIR, f"{nome}.txt")

        if os.path.exists(txt_path) and os.path.getsize(txt_path) > 100:
            print(f"[{i}/{len(arquivos_audio)}] Já transcrito: {nome}")
            pulados += 1
            continue

        print(f"[{i}/{len(arquivos_audio)}] Transcrevendo: {nome}")
        try:
            result = modelo.transcribe(audio_path, language="pt", verbose=False)
            with open(txt_path, "w", encoding="utf-8") as f:
                f.write(f"# {nome}\n\n")
                f.write(result["text"])
            print(f"  -> Salvo em: {txt_path}")
            transcritos += 1
        except Exception as e:
            print(f"  ERRO ao transcrever {nome}: {e}")

    print("\n" + "=" * 60)
    print(f"CONCLUÍDO! {transcritos} transcritos, {pulados} já existiam.")
    print(f"Transcrições em: {TEXT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    audios = sorted(glob.glob(os.path.join(AUDIO_DIR, "*.mp3")))
    if not audios:
        print(f"Nenhum áudio .mp3 encontrado em: {AUDIO_DIR}")
        sys.exit(1)
    transcrever(audios)
