/* ============================================================
   aulas-data.js — Dados de todos os cursos
   ============================================================ */

var AULAS_DATA = {
  'historia-filosofia': {
    nome: 'Historia da Filosofia',
    pagina: 'historia-filosofia.html',
    aulas: [
      {
        n: 1,
        titulo: 'O que e Filosofia?',
        tituloHtml: 'O que &eacute; Filosofia?',
        desc: 'Aula introdutoria sobre o que e filosofia, suas origens no panteismo grego e a ruptura racional que deu inicio ao pensamento filosofico ocidental.',
        video: 'VDmL97qcNsg',
        bloco: 'Bloco 1 — Filosofia Antiga',
        diagrams: [
          /* ---- 1. Cosmologia Panteista (concentricCircles) ---- */
          {
            type: 'concentricCircles',
            title: 'A Cosmologia Panteista',
            subtitle: 'O universo como camadas de cebola: da divindade central ate a materia.',
            navLabel: 'Cosmologia',
            rings: [
              {
                label: 'Materia (casca externa)',
                size: 420,
                bg: 'rgba(44,44,58,0.02)',
                borderColor: 'rgba(44,44,58,0.12)',
                labelPosition: 'bottom',
                labelColor: 'var(--color-text-light)',
                zIndex: 1,
                opacity: 0.6
              },
              {
                label: 'Almas Inferiores',
                size: 340,
                bg: 'rgba(44,44,58,0.03)',
                borderColor: 'rgba(44,44,58,0.15)',
                borderStyle: 'dashed',
                labelPosition: 'top',
                labelColor: 'var(--color-text-light)',
                zIndex: 2
              },
              {
                label: 'Zeus, Poseidon, Hades...',
                size: 260,
                bg: 'rgba(77,101,255,0.03)',
                borderColor: 'rgba(77,101,255,0.2)',
                borderStyle: 'dashed',
                labelPosition: 'top',
                labelColor: 'var(--color-accent)',
                zIndex: 3,
                opacity: 0.7
              },
              {
                label: 'Cronos (Tempo)',
                size: 170,
                bg: 'rgba(77,101,255,0.06)',
                borderColor: 'rgba(77,101,255,0.35)',
                labelPosition: 'top',
                labelColor: 'var(--color-accent)',
                zIndex: 4
              },
              {
                label: 'Uranus',
                size: 90,
                bg: 'radial-gradient(circle, #c9a84c 0%, #a8872e 100%)',
                borderColor: '#c9a84c',
                zIndex: 5,
                glow: '0 0 40px rgba(201,168,76,0.4), 0 0 80px rgba(201,168,76,0.15)',
                isCenter: true
              }
            ],
            legend: [
              {
                color: '#c9a84c',
                shadow: '0 0 8px rgba(201,168,76,0.4)',
                title: 'Uranus &mdash; A Divindade Central',
                desc: 'O Deus Altissimo, os Ceus. Fonte de toda emanacao. Gera tudo por processo necessario e mecanico.'
              },
              {
                color: 'var(--color-accent)',
                title: 'Cronos &mdash; O Tempo',
                desc: 'Primeira emanacao. Devora seus proprios filhos ate ser destronado pela triade: Zeus, Poseidon e Hades.'
              },
              {
                color: 'rgba(77,101,255,0.4)',
                title: 'Deuses &mdash; Emanacoes Sucessivas',
                desc: 'Cada deus gera novos deuses por emanacao. Processo que se repete "n vezes, a gosto do fregues".'
              },
              {
                color: 'var(--color-text-light)',
                title: 'Almas Inferiores &mdash; Nos',
                desc: 'As almas se rebelaram e foram desterradas para a casca externa. Somos "ondas passageiras no mar da divindade".'
              },
              {
                color: 'var(--color-border)',
                title: 'Materia &mdash; A Prisao',
                desc: 'Principio de limitacao e individuacao. "O Carandiru das almas." O ideal e purificar-se e retornar ao mundo espiritual.'
              }
            ]
          },

          /* ---- 2. Condicao Humana (cardGrid) ---- */
          {
            type: 'cardGrid',
            title: 'A Condicao Humana no Panteismo',
            subtitle: 'Rebeliao, desterro e a busca pela purificacao.',
            navLabel: 'Condicao Humana',
            cards: [
              {
                accentColor: '#e53e3e',
                iconBg: 'rgba(229,62,62,0.08)',
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
                title: 'A Rebeliao',
                text: 'As almas inferiores, de algum modo nao descrito, se rebelam contra o Deus Altissimo e sao desterradas para a casca externa &mdash; o mundo material.'
              },
              {
                accentColor: '#4d65ff',
                iconBg: 'rgba(77,101,255,0.08)',
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4d65ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
                title: 'A Prisao Material',
                text: 'A materia e principio de limitacao: nao podemos voar, teletransportar, comer ambrosia. O corpo limita a alma.',
                quote: '"A materia e o Carandiru das almas."'
              },
              {
                accentColor: '#c9a84c',
                iconBg: 'rgba(201,168,76,0.1)',
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
                title: 'A Purificacao',
                text: 'O ideal e que a alma aproveite o estado de decadencia para se purificar e retornar ao mundo espiritual. Se nao conseguir, renasce em novo ciclo.'
              }
            ]
          },

          /* ---- 3. Universo Ciclico (cycleDiagram) ---- */
          {
            type: 'cycleDiagram',
            title: 'O Universo Ciclico e o Destino',
            subtitle: 'Tudo se move em ciclos &mdash; dos astros a alma humana.',
            navLabel: 'Ciclos',
            centerTitle: 'Ciclos',
            centerSub: 'Universais',
            nodes: [
              {
                position: 'top',
                label: 'Lua',
                bg: 'rgba(77,101,255,0.1)',
                color: 'var(--color-accent)',
                borderColor: 'rgba(77,101,255,0.25)',
                icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
              },
              {
                position: 'right',
                label: 'Sol',
                bg: 'rgba(201,168,76,0.12)',
                color: '#a8872e',
                borderColor: 'rgba(201,168,76,0.3)',
                icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>'
              },
              {
                position: 'bottom',
                label: 'Estacoes',
                bg: 'rgba(56,161,105,0.08)',
                color: '#38a169',
                borderColor: 'rgba(56,161,105,0.25)',
                icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L2 21l.73-2.64C4.24 14.15 7 9 17 8z"/><path d="M17 8c4 0 6 2 6 6"/></svg>'
              },
              {
                position: 'left',
                label: 'Vida',
                bg: 'rgba(229,62,62,0.08)',
                color: '#c53030',
                borderColor: 'rgba(229,62,62,0.2)',
                icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
              }
            ],
            namesTitle: 'Nomes para a mesma realidade',
            tags: ['Logos', 'Lei Eterna', 'Ananke (Destino)', 'Karma', 'Horoscopo', 'Lei Universal'],
            summary: '<strong>A energia que move o universo</strong> pode ser de tres tipos: <strong>amor</strong> (positivo atrai positivo), <strong>odio</strong> (negativo repele), ou <strong>alternancia entre ambos</strong> &mdash; a dialetica. Platao usa isso como argumentacao; Hegel a erige em lei geral.'
          },

          /* ---- 4. Panteismo vs Filosofia (comparisonPanel) ---- */
          {
            type: 'comparisonPanel',
            title: 'Por que o Panteismo Nao Permite Filosofia',
            subtitle: 'Imaginacao poetica versus razao logica.',
            navLabel: 'Panteismo',
            left: {
              title: 'Panteismo',
              theme: 'dark',
              items: [
                '<strong>Tudo e tudo</strong> &mdash; nao ha principio de identidade nem de nao-contradicao',
                'Baseado em <strong>imaginacao poetica</strong> e fantasia, nao em razao',
                'Sem autoridade dogmatica &mdash; <strong>vale tudo</strong>, cada um escolhe o que venerar',
                'Deus e bom e mau, belo e feio &mdash; <strong>relativismo necessario</strong>',
                'Sentimento predominante: <strong>medo</strong> perante forcas cosmicas'
              ]
            },
            right: {
              title: 'Filosofia',
              theme: 'light',
              items: [
                '<strong>Principio da nao-contradicao</strong> &mdash; A nao e nao-A',
                'Baseada em <strong>razao</strong>, logica e argumentacao',
                'Busca <strong>compreender</strong> racionalmente a estrutura do mundo',
                'Deus nao e o mundo. <strong>Coisas sao distintas</strong>',
                'Caminha para o <strong>monoteismo</strong> (Socrates, Platao, Aristoteles)'
              ]
            }
          },

          /* ---- 5. Nascimento da Filosofia (timeline) ---- */
          {
            type: 'timeline',
            title: 'O Nascimento da Filosofia',
            subtitle: 'De Homero a Aristoteles: o caminho ate a razao.',
            navLabel: 'Nascimento',
            items: [
              {
                tag: 'Precursor',
                title: 'Homero',
                text: 'Antropomorfiza os deuses gregos &mdash; paixoes, traicoes, jogos de poder. Educador da Grecia. Torna o panteao compreensivel, abrindo caminho para a razao.'
              },
              {
                tag: 'Pre-Socraticos',
                title: 'A Busca da Substancia',
                text: 'Tentam entender racionalmente a substancia basica do mundo. A diferenca: nao por inspiracao poetica, mas por investigacao racional.'
              },
              {
                tag: 'Ruptura',
                title: 'Parmenides',
                text: 'Descobre o principio da nao-contradicao. Ao aplica-lo ao panteismo, desmonta todo o sistema: "Deus nao e o mundo. Laranjas sao laranjas. Queijo e queijo."'
              },
              {
                tag: 'A Grande Triade',
                title: 'Socrates, Platao, Aristoteles',
                text: 'Consolidam a ruptura com o panteismo. Chegam a algo muito mais proximo do monoteismo judaico-cristao. Fundamentam a filosofia como busca racional.',
                tagColor: 'var(--color-gold)'
              }
            ]
          },

          /* ---- 6. Filosofia vs Ciencia (comparisonTable) ---- */
          {
            type: 'comparisonTable',
            title: 'Filosofia vs Ciencia',
            subtitle: 'As quatro causas de Aristoteles e o limite entre filosofia e ciencia.',
            navLabel: 'Filosofia vs Ciencia',
            columns: ['', 'Filosofia', 'Ciencia'],
            rows: [
              ['Pergunta central', '<strong>O que e?</strong> e <strong>Por que existe?</strong>', '<strong>Como funciona?</strong>'],
              ['Metodo', 'Razao, logica, argumentacao', 'Observacao + matematizacao (Newton)'],
              ['Matematizavel?', '<span class="compare-highlight highlight-blue">Nao</span>', '<span class="compare-highlight highlight-gold">Sim</span>'],
              ['Objeto', 'Deus, o homem e o mundo (o que sao)', 'Fenomenos naturais (como operam)'],
              ['Exemplo', '"Por que a gravidade existe?"', '"Como a gravidade funciona?" (F = ma)']
            ],
            subDiagram: {
              type: 'causeCards',
              cards: [
                {
                  number: 'I',
                  name: 'Causa Formal',
                  question: '"O que e?"',
                  desc: 'A essencia, a definicao da coisa',
                  owner: 'Filosofia',
                  ownerClass: 'owner-phil'
                },
                {
                  number: 'II',
                  name: 'Causa Material',
                  question: '"De que e feito?"',
                  desc: 'A materia, o substrato',
                  owner: 'Ambas',
                  ownerClass: 'owner-both'
                },
                {
                  number: 'III',
                  name: 'Causa Eficiente',
                  question: '"Por que / como?"',
                  desc: 'A origem, o mecanismo',
                  owner: 'Ciencia',
                  ownerClass: 'owner-sci'
                },
                {
                  number: 'IV',
                  name: 'Causa Final',
                  question: '"Para que serve?"',
                  desc: 'O proposito, a finalidade',
                  owner: 'Filosofia',
                  ownerClass: 'owner-phil'
                }
              ]
            }
          },

          /* ---- 7. Tres Operacoes da Razao (flowSteps) ---- */
          {
            type: 'flowSteps',
            title: 'As Tres Operacoes da Razao',
            subtitle: 'Abstracao, juizo e silogismo: os instrumentos do pensamento filosofico.',
            navLabel: 'Razao',
            steps: [
              {
                num: 1,
                title: 'Abstracao',
                latin: 'Conceito',
                text: 'A razao responde: <strong>"o que e isto?"</strong> Extrai a essencia da coisa observada.',
                example: '<strong>Exemplo:</strong> Olho para o objeto e abstraio: "isto e um copo de agua."'
              },
              {
                num: 2,
                title: 'Juizo',
                latin: 'Verdadeiro ou Falso',
                text: 'Conexao entre dois conceitos. Pode ser <strong>verdadeiro ou falso</strong> &mdash; exige retorno ao real para verificacao.',
                example: '<strong>Exemplo:</strong> "O PP e verde-oliva" &mdash; olho para ele e verifico: falso.'
              },
              {
                num: 3,
                title: 'Silogismo',
                latin: 'Do conhecido ao desconhecido',
                text: 'Conclusao logica a partir de premissas verificadas. Ferramenta central da deducao filosofica.',
                example: '<strong>Exemplo:</strong> "Todos os homens sao mortais. O PP e homem. Logo, o PP e mortal."'
              }
            ],
            note: '<strong>Atencao com as inducoes:</strong> "Todos os homens sao mortais" parte da observacao &mdash; mas ninguem observou todos os seres humanos de todos os tempos. Ha sempre um grau de incerteza. A <strong>historia da filosofia</strong> ajuda a corrigir isso: comparando e conectando teorias, aumenta-se a coerencia do conhecimento.'
          },

          /* ---- 8. Finalidade da Filosofia (convergence) ---- */
          {
            type: 'convergence',
            title: 'A Finalidade da Filosofia',
            subtitle: 'Segundo Aristoteles: conhecer para poder amar.',
            navLabel: 'Finalidade',
            items: [
              {
                icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4d65ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
                title: 'Verdade',
                text: 'Todo ser humano deseja conhecer a verdade &mdash; eterna, estavel, que nao mude a toda hora.',
                borderColor: 'rgba(77,101,255,0.25)',
                bgColor: 'rgba(77,101,255,0.03)'
              },
              {
                icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
                title: 'Amor',
                text: 'Todo ser humano deseja amar. A verdade e condicao do amor autentico &mdash; so se ama o que se conhece.',
                borderColor: 'rgba(229,62,62,0.2)',
                bgColor: 'rgba(229,62,62,0.02)'
              }
            ],
            convergeLabel: 'Convergem em',
            result: {
              tag: 'Aristoteles',
              title: 'Contemplacao',
              text: 'Um conhecimento amoroso da realidade. Conhecer Deus, o homem e o mundo de modo a poder ama-los.',
              triad: ['Deus', 'Homem', 'Mundo']
            }
          }
        ]
      },

      {
        n: 2,
        titulo: 'Os Pre-socraticos',
        tituloHtml: 'Os Pr&eacute;-socr&aacute;ticos',
        desc: 'Os primeiros filosofos e a busca pela substancia fundamental do universo.',
        video: 'KQE4rcsBISg',
        bloco: 'Bloco 1 — Filosofia Antiga',
        diagrams: []
      },
      {
        n: 3,
        titulo: 'Socrates',
        tituloHtml: 'S&oacute;crates',
        desc: 'A vida e o metodo socratico: a maieutica e a busca pela verdade.',
        video: '7f1bRh3A2JA',
        bloco: 'Bloco 1 — Filosofia Antiga',
        diagrams: []
      },
      {
        n: 4,
        titulo: 'Platao (Parte I)',
        tituloHtml: 'Plat&atilde;o (Parte I)',
        desc: 'Introducao ao pensamento de Platao e a teoria das ideias.',
        video: 'vuT3t_MXpd4',
        bloco: 'Bloco 1 — Filosofia Antiga',
        diagrams: []
      },
      {
        n: 5,
        titulo: 'Platao (Parte II)',
        tituloHtml: 'Plat&atilde;o (Parte II)',
        desc: 'Continuacao do estudo de Platao.',
        video: 'GD1YPzBSRe4',
        bloco: 'Bloco 1 — Filosofia Antiga',
        diagrams: []
      },
      {
        n: 6,
        titulo: 'Platao (Parte III)',
        tituloHtml: 'Plat&atilde;o (Parte III)',
        desc: 'Continuacao do estudo de Platao.',
        video: '9foXl7mtlVg',
        bloco: 'Bloco 1 — Filosofia Antiga',
        diagrams: []
      },
      {
        n: 7,
        titulo: 'Platao (Parte IV)',
        tituloHtml: 'Plat&atilde;o (Parte IV)',
        desc: 'Conclusao do estudo de Platao.',
        video: 'unRHVuE1xQQ',
        bloco: 'Bloco 1 — Filosofia Antiga',
        diagrams: []
      },
      {
        n: 8,
        titulo: 'Introducao a Etica Aristotelica',
        tituloHtml: 'Introdu&ccedil;&atilde;o &agrave; &Eacute;tica Aristot&eacute;lica',
        desc: 'Os fundamentos da etica segundo Aristoteles.',
        video: '6M5pjuqyCQE',
        bloco: 'Bloco 2 — Aristoteles',
        diagrams: []
      },
      {
        n: 9,
        titulo: 'Antropologia Aristotelica (Parte I)',
        tituloHtml: 'Antropologia Aristot&eacute;lica (Parte I)',
        desc: 'A visao aristotelica do ser humano.',
        video: 'kUCNTk82XwA',
        bloco: 'Bloco 2 — Aristoteles',
        diagrams: []
      },
      {
        n: 10,
        titulo: 'Antropologia Aristotelica (Parte II)',
        tituloHtml: 'Antropologia Aristot&eacute;lica (Parte II)',
        desc: 'Continuacao da antropologia aristotelica.',
        video: 'FKtIuHtCUE8',
        bloco: 'Bloco 2 — Aristoteles',
        diagrams: []
      },
      {
        n: 11,
        titulo: 'O Conceito de Pessoa',
        desc: 'O desenvolvimento do conceito filosofico de pessoa.',
        video: 'Pa1jVmuzyyM',
        bloco: 'Bloco 3 — Filosofia Medieval',
        diagrams: []
      },
      {
        n: 12,
        titulo: 'Santo Agostinho',
        desc: 'O pensamento filosofico de Santo Agostinho.',
        video: 'DbRrjdxdOLY',
        bloco: 'Bloco 3 — Filosofia Medieval',
        diagrams: []
      },
      {
        n: 13,
        titulo: 'A Metafisica de Sao Tomas de Aquino',
        tituloHtml: 'A Metaf&iacute;sica de S&atilde;o Tom&aacute;s de Aquino',
        desc: 'Os fundamentos metafisicos do pensamento tomista.',
        video: 'wZsXZlysPEY',
        bloco: 'Bloco 3 — Filosofia Medieval',
        diagrams: []
      },
      {
        n: 14,
        titulo: 'Sao Tomas de Aquino e as Cinco Vias',
        tituloHtml: 'S&atilde;o Tom&aacute;s de Aquino e as Cinco Vias',
        desc: 'As cinco vias para a existencia de Deus segundo Sao Tomas.',
        video: 'wMXW64yGvFY',
        bloco: 'Bloco 3 — Filosofia Medieval',
        diagrams: []
      },
      {
        n: 15,
        titulo: 'Fundamentos da Moral Tomista (Parte I)',
        desc: 'A moral segundo Sao Tomas de Aquino.',
        video: 'hMbMOhBDuOw',
        bloco: 'Bloco 3 — Filosofia Medieval',
        diagrams: []
      },
      {
        n: 16,
        titulo: 'Fundamentos da Moral Tomista (Parte II)',
        desc: 'Continuacao dos fundamentos da moral tomista.',
        video: 'a3PMQ8aEqf4',
        bloco: 'Bloco 3 — Filosofia Medieval',
        diagrams: []
      },
      {
        n: 17,
        titulo: 'O Nominalismo',
        desc: 'O nominalismo e suas consequencias para a filosofia.',
        video: 'AqQtqBcb1os',
        bloco: 'Bloco 3 — Filosofia Medieval',
        diagrams: []
      },
      {
        n: 18,
        titulo: 'Sao Tomas de Aquino: Antropologia',
        tituloHtml: 'S&atilde;o Tom&aacute;s de Aquino: Antropologia',
        desc: 'A antropologia filosofica de Sao Tomas de Aquino.',
        video: 'nhraHXdXzh0',
        bloco: 'Bloco 3 — Filosofia Medieval',
        diagrams: []
      },
      {
        n: 19,
        titulo: 'Descartes e a Duvida Metodica',
        tituloHtml: 'Descartes e a D&uacute;vida Met&oacute;dica',
        desc: 'O metodo cartesiano e a duvida como instrumento filosofico.',
        video: 'kMyxRnuUV9o',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 20,
        titulo: 'Francis Bacon e o Metodo Cientifico',
        tituloHtml: 'Francis Bacon e o M&eacute;todo Cient&iacute;fico',
        desc: 'Francis Bacon e a fundamentacao do metodo cientifico.',
        video: 'IjyN-b6Z84A',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 21,
        titulo: 'Espinoza',
        desc: 'O pensamento de Baruch Espinoza.',
        video: 'MpllUngZZXQ',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 22,
        titulo: 'Hobbes e o Contrato Social',
        desc: 'Thomas Hobbes e a teoria do contrato social.',
        video: 'GK575P79cZM',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 23,
        titulo: 'Leibniz',
        desc: 'O pensamento filosofico de Leibniz.',
        video: '2sSK88BqFvI',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 24,
        titulo: 'David Hume e o Empirismo',
        desc: 'David Hume e a filosofia empirista.',
        video: 'OkDS2t2i_e4',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 25,
        titulo: 'Newton',
        desc: 'As contribuicoes filosoficas de Isaac Newton.',
        video: 'EazTKOMyXW4',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 26,
        titulo: 'Kant I',
        desc: 'Introducao ao pensamento de Immanuel Kant.',
        video: 'EqGepw832P4',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 27,
        titulo: 'Kant II',
        desc: 'Continuacao do estudo de Kant.',
        video: 'fnb_gF1UX-M',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 28,
        titulo: 'Idealismo Alemao',
        tituloHtml: 'Idealismo Alem&atilde;o',
        desc: 'O movimento do idealismo alemao.',
        video: 'pU58FTea_jI',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 29,
        titulo: 'Marx',
        desc: 'O pensamento filosofico de Karl Marx.',
        video: 'KCThDSiJHr8',
        bloco: 'Bloco 4 — Filosofia Moderna',
        diagrams: []
      },
      {
        n: 30,
        titulo: 'Kierkegaard I',
        desc: 'Introducao ao pensamento de Kierkegaard.',
        video: 'XHUiSGO6UsE',
        bloco: 'Bloco 5 — Filosofia Contemporanea',
        diagrams: []
      },
      {
        n: 31,
        titulo: 'Kierkegaard II',
        desc: 'Continuacao do estudo de Kierkegaard.',
        video: 'bte44zs5yBc',
        bloco: 'Bloco 5 — Filosofia Contemporanea',
        diagrams: []
      },
      {
        n: 32,
        titulo: 'Nietzsche (Parte 1)',
        desc: 'O pensamento de Friedrich Nietzsche.',
        video: 'VLj4AMjIZAI',
        bloco: 'Bloco 5 — Filosofia Contemporanea',
        diagrams: []
      },
      {
        n: 33,
        titulo: 'Nietzsche (Parte 2)',
        desc: 'Continuacao do estudo de Nietzsche.',
        video: 'mXTRWp5PeM4',
        bloco: 'Bloco 5 — Filosofia Contemporanea',
        diagrams: []
      },
      {
        n: 34,
        titulo: 'Tendencias do Final do Seculo XIX',
        tituloHtml: 'Tend&ecirc;ncias do Final do S&eacute;culo XIX',
        desc: 'As principais tendencias filosoficas do final do seculo XIX.',
        video: 'JXFuyrIgg0g',
        bloco: 'Bloco 5 — Filosofia Contemporanea',
        diagrams: []
      },
      {
        n: 35,
        titulo: 'Escola de Frankfurt',
        desc: 'A Escola de Frankfurt e a teoria critica.',
        video: '9ul44u79I8k',
        bloco: 'Bloco 5 — Filosofia Contemporanea',
        diagrams: []
      },
      {
        n: 36,
        titulo: 'Personalismo I',
        desc: 'Introducao ao personalismo filosofico.',
        video: 'aUqhbVRGkJA',
        bloco: 'Bloco 5 — Filosofia Contemporanea',
        diagrams: []
      },
      {
        n: 37,
        titulo: 'Personalismo II',
        desc: 'Continuacao do estudo do personalismo.',
        video: 'xudHtt8k4yA',
        bloco: 'Bloco 5 — Filosofia Contemporanea',
        diagrams: []
      },
      {
        n: 38,
        titulo: 'Niilismos',
        desc: 'O niilismo e suas manifestacoes na filosofia.',
        video: 'ChwPQm5oCYw',
        bloco: 'Extra — Aula Complementar',
        diagrams: []
      }
    ]
  },

  'grandes-ideias': {
    nome: 'Pequena Historia das Grandes Ideias',
    pagina: 'curso.html',
    aulas: [
      { n: 1, titulo: 'O Sagrado', desc: 'O centro da religiao', video: 'UxXt7lFk-IQ', bloco: 'Modulo 1 — Ideias Pre-filosoficas', diagrams: [] },
      { n: 2, titulo: 'As Religioes', desc: 'Resposta diante do Sagrado', video: '2Uk26VFMEoQ', bloco: 'Modulo 1 — Ideias Pre-filosoficas', diagrams: [] },
      { n: 3, titulo: 'O Pecado', desc: 'Sofrimento humano', video: 'Hnev4QXeUdQ', bloco: 'Modulo 1 — Ideias Pre-filosoficas', diagrams: [] },
      { n: 4, titulo: 'A Morte', desc: 'Ser ou nao ser?', video: '6PGfquY3PdI', bloco: 'Modulo 1 — Ideias Pre-filosoficas', diagrams: [] },
      { n: 5, titulo: 'O Destino', desc: 'Eu sou livre?', video: 'P8R-DZeYzFY', bloco: 'Modulo 1 — Ideias Pre-filosoficas', diagrams: [] },
      { n: 6, titulo: 'A Salvacao', desc: 'Busca da felicidade', video: 'VeVbXnG1p8g', bloco: 'Modulo 1 — Ideias Pre-filosoficas', diagrams: [] },
      { n: 7, titulo: 'A Ordem', desc: 'A estrutura do real', video: 'bintEGCRokY', bloco: 'Modulo 2 — Metafisica', diagrams: [] },
      { n: 8, titulo: 'As Formas', desc: 'As formas do ser', video: 'fN9LRUFdXpY', bloco: 'Modulo 2 — Metafisica', diagrams: [] },
      { n: 9, titulo: 'A Materia', desc: 'O substrato material', video: 'cisvy53X6ZY', bloco: 'Modulo 2 — Metafisica', diagrams: [] },
      { n: 10, titulo: 'O Movimento', desc: 'A mudanca e o devir', video: '-N2zRnOswGQ', bloco: 'Modulo 2 — Metafisica', diagrams: [] },
      { n: 11, titulo: 'As Causas', desc: 'Por que as coisas existem', video: 'vzfrcalM4ok', bloco: 'Modulo 2 — Metafisica', diagrams: [] },
      { n: 12, titulo: 'O Ser', desc: 'A questao fundamental', video: 'AGucL72L7fE', bloco: 'Modulo 2 — Metafisica', diagrams: [] },
      { n: 13, titulo: 'A Vida', desc: 'O fenomeno vital', video: 'SThINqynOlk', bloco: 'Modulo 3 — Antropologia Filosofica', diagrams: [] },
      { n: 14, titulo: 'A Alma', desc: 'A forma do corpo', video: 'j8ym9VlBYJs', bloco: 'Modulo 3 — Antropologia Filosofica', diagrams: [] },
      { n: 15, titulo: 'O Corpo', desc: 'Materia e espirito', video: 'tVqa1Wxehmc', bloco: 'Modulo 3 — Antropologia Filosofica', diagrams: [] },
      { n: 16, titulo: 'A Pessoa', desc: 'O conceito de pessoa', video: '98NCOCxTVHs', bloco: 'Modulo 3 — Antropologia Filosofica', diagrams: [] },
      { n: 17, titulo: 'A Sociedade', desc: 'O homem como ser social', video: 'rFztfDXuuek', bloco: 'Modulo 3 — Antropologia Filosofica', diagrams: [] }
    ]
  },

  'religioes': {
    nome: 'As Grandes Religioes',
    pagina: 'religioes.html',
    aulas: [
      { n: 1, titulo: 'Panteismo I', desc: 'O universo divino', video: 'eH6xL-CRkac', bloco: 'As Grandes Religioes', diagrams: [] },
      { n: 2, titulo: 'Panteismo II', desc: 'Continuacao', video: 'QtKoIMqTeoY', bloco: 'As Grandes Religioes', diagrams: [] },
      { n: 3, titulo: 'A Revolucao Monoteista', desc: 'A ruptura com o panteismo', video: 'aWcnZWFT4sw', bloco: 'As Grandes Religioes', diagrams: [] },
      { n: 4, titulo: 'Cristianismo', desc: 'A fe crista', video: 'i9PVlwL480I', bloco: 'As Grandes Religioes', diagrams: [] },
      { n: 5, titulo: 'Islamismo', desc: 'O isla', video: 'uC3Qxhq-EeM', bloco: 'As Grandes Religioes', diagrams: [] }
    ]
  }
};
