# US-02: Atmosfera Abissal e Imersão Sensorial (v3.0 - Finalizada)

## 1. Narrativa (BDD)

**Como** visitante do site,
**Eu quero** que o ambiente simule a densidade, iluminação e sonoridade do fundo do mar de forma fluida e infinita,
**Para que** a planta de engenharia submarina seja o destaque em um cenário realista.

**Cenário: Renderização de Ambiente Submarino Seamless**

- **Dado que** o sistema utiliza variáveis CSS do Tailwind v4 para cores,
- **Quando** o leito marinho e a névoa são renderizados,
- **Então** a transição entre o chão e o horizonte deve ser imperceptível (Seamless),
- **E** a luz de caustics deve apresentar movimento orgânico de deriva (drift),
- **E** o objeto central deve permanecer visível através de um rig de iluminação técnica.

## 2. Critérios de Aceite

- AC01: Sincronização de cores entre Background, Fog e Material do Chão usando `--color-abyssal`.
- AC02: Implementação de `FogExp2` com densidade calibrada em `0.02` para equilíbrio entre visibilidade e profundidade.
- AC03: Projeção de textura de luz (Light Cookie) usando o arquivo /public/textures/caustics.png para simular refração.
- AC04: Implementação de um Rig de Iluminação de 3 pontos:
  - `AmbientLight` (0.5) para preenchimento.
  - `HemisphereLight` para volume e tons de rebatimento.
  - `SpotLight` com textura para efeitos no chão e `PointLight` limpa para o ativo.
- AC05: Sistema de partículas (Marine Snow) com movimento de deriva aleatório.
- AC06: Áudio ambiente (Abyssal Hum) integrado com controle de volume no HUD (shadcn/ui).

## 3. Requisitos Não-Funcionais

- NFR01: O plano do leito marinho deve ter escala mínima de 500x500 para evitar visualização de bordas.
- NFR02: Uso de `dpr={[1, 2]}` para otimização em telas de alta densidade de pixels.
- NFR03: O áudio deve ser carregado via `AudioLoader` para evitar travamentos na thread principal.

## 4. Contexto Técnico 3D

- **Cores:** `getThemeColor('--color-abyssal')` via utilitário customizado.
- **Animação:** `texture.offset.x += 0.01 * delta` dentro do loop de renderização.
- **Geometria:** `PlaneGeometry` rotacionada em `-Math.PI / 2` para o leito marinho.
- **Áudio:** Web Audio API através do Three.js `AudioListener`.
- **Assets:** /public/textures/caustics.png.
