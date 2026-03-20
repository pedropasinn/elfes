#!/usr/bin/env python3
"""
Script para baixar áudios e transcrever vídeos dos cursos do Prof. Henrique Elfes.

Cursos disponíveis:
  - phgi : Pequena História das Grandes Ideias (17 aulas, 3 módulos)
  - gr   : As Grandes Religiões (5 aulas)
  - hf   : História da Filosofia (39 aulas) — playlist completa

Uso:
  python transcrever_cursos.py              # todos os cursos
  python transcrever_cursos.py phgi         # só PHGI
  python transcrever_cursos.py phgi gr      # PHGI e GR
  python transcrever_cursos.py --so-transcrever hf  # só transcreve (áudios já baixados)
"""

import subprocess
import os
import glob
import sys

ROOT = os.path.join(os.path.dirname(__file__), "..", "Cursos")

# ─── Configuração dos cursos ───────────────────────────────────────────────

CURSOS = {
    "phgi": {
        "nome": "Pequena História das Grandes Ideias",
        "dir": os.path.join(ROOT, "PHGI", "transcricoes"),
        "videos": [
            # Módulo 1
            ("m1-01-o-sagrado", "https://youtu.be/UxXt7lFk-IQ"),
            ("m1-02-as-religioes", "https://youtu.be/2Uk26VFMEoQ"),
            ("m1-03-o-pecado", "https://youtu.be/Hnev4QXeUdQ"),
            ("m1-04-a-morte", "https://youtu.be/6PGfquY3PdI"),
            ("m1-05-o-destino", "https://youtu.be/P8R-DZeYzFY"),
            ("m1-06-a-salvacao", "https://youtu.be/VeVbXnG1p8g"),
            # Módulo 2
            ("m2-01-mito", "https://youtu.be/bintEGCRokY"),
            ("m2-02-pre-socraticos", "https://youtu.be/fN9LRUFdXpY"),
            ("m2-03-socrates", "https://youtu.be/cisvy53X6ZY"),
            ("m2-04-platao", "https://youtu.be/-N2zRnOswGQ"),
            ("m2-05-aristoteles", "https://youtu.be/vzfrcalM4ok"),
            ("m2-06-filosofia-crista", "https://youtu.be/AGucL72L7fE"),
            # Módulo 3
            ("m3-01-renascimento", "https://youtu.be/SThINqynOlk"),
            ("m3-02-racionalismo", "https://youtu.be/j8ym9VlBYJs"),
            ("m3-03-empirismo", "https://youtu.be/tVqa1Wxehmc"),
            ("m3-04-idealismo", "https://youtu.be/98NCOCxTVHs"),
            ("m3-05-contemporaneo", "https://youtu.be/rFztfDXuuek"),
        ],
    },
    "gr": {
        "nome": "As Grandes Religiões",
        "dir": os.path.join(ROOT, "GR", "transcricoes"),
        "videos": [
            ("01-panteismo-i", "https://youtu.be/eH6xL-CRkac"),
            ("02-panteismo-ii", "https://youtu.be/QtKoIMqTeoY"),
            ("03-revolucao-monoteista", "https://youtu.be/aWcnZWFT4sw"),
            ("04-cristianismo", "https://youtu.be/i9PVlwL480I"),
            ("05-islamismo", "https://youtu.be/uC3Qxhq-EeM"),
        ],
    },
    "hf": {
        "nome": "História da Filosofia",
        "dir": os.path.join(ROOT, "HF", "transcricoes"),
        "playlist": "https://www.youtube.com/playlist?list=PL9ymgSAPJFid17GxrePYsJz31DU7bHPEr",
    },
}


def baixar_audio_video(url, output_path):
    """Baixa áudio de um único vídeo do YouTube."""
    cmd = [
        "yt-dlp",
        "-x",
        "--audio-format", "mp3",
        "--audio-quality", "5",
        "-o", output_path,
        "--no-overwrites",
        url,
    ]
    result = subprocess.run(cmd)
    if result.returncode != 0:
        print(f"  AVISO: yt-dlp terminou com código {result.returncode}")
    return result.returncode == 0


def baixar_playlist(playlist_url, audio_dir):
    """Baixa áudios de uma playlist completa."""
    cmd = [
        "yt-dlp",
        "-x",
        "--audio-format", "mp3",
        "--audio-quality", "5",
        "-o", os.path.join(audio_dir, "%(playlist_index)03d - %(title)s.%(ext)s"),
        "--yes-playlist",
        "--no-overwrites",
        playlist_url,
    ]
    result = subprocess.run(cmd)
    if result.returncode != 0:
        print(f"  AVISO: yt-dlp terminou com código {result.returncode}")


def baixar_audios_curso(curso_id, config):
    """Baixa os áudios de um curso (por vídeos individuais ou playlist)."""
    audio_dir = os.path.join(config["dir"], "audios")
    os.makedirs(audio_dir, exist_ok=True)

    print(f"\n{'=' * 60}")
    print(f"BAIXANDO ÁUDIOS: {config['nome']} ({curso_id.upper()})")
    print(f"{'=' * 60}")

    if "playlist" in config:
        baixar_playlist(config["playlist"], audio_dir)
    elif "videos" in config:
        total = len(config["videos"])
        for i, (nome, url) in enumerate(config["videos"], 1):
            mp3_path = os.path.join(audio_dir, f"{nome}.mp3")
            if os.path.exists(mp3_path):
                print(f"[{i}/{total}] Já existe: {nome}")
                continue
            print(f"[{i}/{total}] Baixando: {nome}")
            baixar_audio_video(url, mp3_path)

    return sorted(glob.glob(os.path.join(audio_dir, "*.mp3")))


def transcrever_audios(config, arquivos_audio):
    """Transcreve os áudios de um curso com Whisper."""
    text_dir = os.path.join(config["dir"], "textos")
    os.makedirs(text_dir, exist_ok=True)

    print(f"\n{'=' * 60}")
    print(f"TRANSCREVENDO: {config['nome']}")
    print(f"Total de arquivos: {len(arquivos_audio)}")
    print(f"{'=' * 60}")

    import whisper
    modelo = whisper.load_model("medium")
    print("Modelo 'medium' carregado.\n")

    transcritos = 0
    pulados = 0

    for i, audio_path in enumerate(arquivos_audio, 1):
        nome = os.path.splitext(os.path.basename(audio_path))[0]
        txt_path = os.path.join(text_dir, f"{nome}.txt")

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

    print(f"\n  Resultado: {transcritos} transcritos, {pulados} já existiam.")
    print(f"  Transcrições em: {text_dir}")


def processar_curso(curso_id, so_transcrever=False):
    """Processa um curso: baixa áudios (se necessário) e transcreve."""
    config = CURSOS[curso_id]
    audio_dir = os.path.join(config["dir"], "audios")

    if so_transcrever:
        audios = sorted(glob.glob(os.path.join(audio_dir, "*.mp3")))
        if not audios:
            print(f"Nenhum áudio encontrado em: {audio_dir}")
            return
    else:
        audios = baixar_audios_curso(curso_id, config)
        if not audios:
            print(f"Nenhum áudio disponível para {config['nome']}.")
            return

    transcrever_audios(config, audios)


def main():
    so_transcrever = "--so-transcrever" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("--")]

    if args:
        cursos_selecionados = args
    else:
        cursos_selecionados = list(CURSOS.keys())

    for curso_id in cursos_selecionados:
        if curso_id not in CURSOS:
            print(f"Curso desconhecido: '{curso_id}'")
            print(f"Cursos disponíveis: {', '.join(CURSOS.keys())}")
            sys.exit(1)

    print("=" * 60)
    print("TRANSCRIÇÃO DE CURSOS — Prof. Henrique Elfes")
    print(f"Cursos: {', '.join(c.upper() for c in cursos_selecionados)}")
    if so_transcrever:
        print("Modo: apenas transcrição (áudios já baixados)")
    print("=" * 60)

    for curso_id in cursos_selecionados:
        processar_curso(curso_id, so_transcrever=so_transcrever)

    print("\n" + "=" * 60)
    print("TUDO CONCLUÍDO!")
    print("=" * 60)


if __name__ == "__main__":
    main()
