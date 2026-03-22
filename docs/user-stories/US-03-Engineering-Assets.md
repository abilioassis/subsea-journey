# US-03: Visualização de Ativo Técnico (ANM/Equipamento)

## 1. Narrativa (BDD)

**Como** engenheiro da Petrobras,
**Eu quero** visualizar um modelo 3D detalhado de um equipamento submarino no leito marinho,
**Para que** eu possa inspecionar os componentes técnicos da planta com realismo industrial.

**Cenário: Substituição da Sonda de Teste pelo Ativo Real**

- **Dado que** a atmosfera abissal (US-02) está configurada e estável,
- **Quando** o sistema inicializar o carregamento do arquivo GLB,
- **Então** o cubo de teste deve ser removido da cena,
- **E** o modelo técnico deve ser renderizado no centro (Y=0),
- **E** todos os sub-objetos do modelo devem projetar e receber sombras das luzes do ROV.

## 2. Critérios de Aceite

- AC01: Carregamento do modelo `/models/equipment.glb` através do hook `useGLTF` da biblioteca Drei.
- AC02: Implementação de um `Suspense` fallback para evitar que a cena quebre durante o download do modelo.
- AC03: O modelo deve utilizar materiais PBR (Physically Based Rendering) nativos do GLTF.
- AC04: Implementação de uma função de `traverse` no modelo carregado para habilitar `castShadow` e `receiveShadow` em todas as malhas internas.
- AC05: O modelo deve ser centralizado e escalonado para uma proporção realista em relação ao leito marinho.

## 3. Requisitos Não-Funcionais

- NFR01: O modelo 3D deve ser carregado de forma assíncrona, sem bloquear a thread principal de UI.
- NFR02: Uso de compressão Draco (se disponível no arquivo) para otimizar o tempo de carregamento.
- NFR03: A performance de renderização deve ser mantida em 60 FPS após a inserção do modelo.

## 4. Contexto Técnico 3D

- **Ativo:** `/public/models/equipment.glb`.
- **Tecnologia:** React Suspense + @react-three/drei (useGLTF).
- **Escala Sugerida:** Iniciar com `scale={1}` e ajustar conforme a geometria do arquivo.
- **Posição:** `[0, 0, 0]` (centralizado no leito marinho).
