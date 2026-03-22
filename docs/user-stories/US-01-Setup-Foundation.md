# US-01: Setup da Infraestrutura e Fundação 3D

## 1. Narrativa (BDD)

**Como** Engenheiro e Desenvolvedor do projeto,
**Eu quero** configurar o ambiente base integrando Astro, React Three Fiber e Tailwind CSS,
**Para que** eu tenha uma fundação sólida e performática para construir a planta submarina.

**Cenário: Inicialização do Canteiro de Obras**

- **Dado que** o ambiente WSL está configurado com Node.js,
- **Quando** eu executo o comando `npm run dev`,
- **Então** o Astro deve servir uma página com um Canvas 3D em tela cheia,
- **E** um cubo laranja (sonda de teste) deve ser renderizado no centro,
- **E** eu devo conseguir interagir com a câmera usando o mouse.

## 2. Critérios de Aceite

- AC01: O projeto deve utilizar a arquitetura de "Ilhas" do Astro com `client:only="react"`.
- AC02: O Canvas 3D deve ocupar 100% da viewport (w-full, h-screen).
- AC03: O componente `Stats` do Drei deve estar visível para monitoramento de performance.
- AC04: O estado global deve ser gerenciado por uma store Zustand em `src/store/useStore.ts`.
- AC05: O Tailwind CSS deve estar configurado e funcional (v4 via @import).

## 3. Requisitos Não-Funcionais

- NFR01: A renderização inicial deve manter estáveis 60 FPS.
- NFR02: O layout deve ser `overflow-hidden` para evitar barras de rolagem no 3D.
- NFR03: O código deve ser escrito em TypeScript com tipagem estrita para evitar erros de runtime.

## 4. Contexto Técnico 3D

- **Frameworks:** Astro v5+, React v18+, R3F v8+.
- **Câmera:** Perspectiva, FOV 45, posição inicial `[0, 2, 5]`.
- **Iluminação:** `ambientLight` (intensidade 0.5) e `pointLight` (posição `[10, 10, 10]`).
- **Controles:** `OrbitControls` habilitado para inspeção do ativo.
- **Background:** Cor sólida `#020617` (Azul marinho profundo).
