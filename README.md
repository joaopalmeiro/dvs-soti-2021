# dvs-soti-2021

> [Challenge](https://www.datavisualizationsociety.org/soti-challenge-2021) (Data Visualization Society)

## Development

- Install [pnpm](https://pnpm.io/installation) (if necessary).
- `pnpm install`.
- `pnpm dev`.

## References

- [Efficient Code Analyzing and Formatting (for React) with ESLint, Prettier and VSCode — 2020 Edition](https://doppelmutzi.github.io/react-eslint-prettier-vscode-2020/) blog post by Sebastian Weber.
- [How to Format Code on Save in VS Code with ESlint](https://www.aleksandrhovhannisyan.com/blog/format-code-on-save-vs-code-eslint/) blog post by Aleksandr Hovhannisyan.
- [Building a Vue3 Typescript Environment with Vite](https://miyauchi.dev/posts/vite-vue3-typescript/) blog post by Tomoki Miyauci.
- [Vite + React + Typescript + Eslint + Prettier](https://github.com/TheSwordBreaker/vite-reactts-eslint-prettier) boilerplate by The Sword Breaker.
- [Drag Behavior: drag bars in a bar chart](http://bl.ocks.org/AlessandraSozzi/e588d03fb7a7bb07c250) Block by Alessandra Sozzi.

## Notes

- [Vite](https://vitejs.dev/):
  - [esbuild](https://esbuild.github.io/): fast JavaScript bundler.
  - ESM: ECMAScript Modules.
  - Development server + build command powered by Rollup.
  - [React template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react).
  - `npx vite --help`.
  - JSON files can be directly imported (more info [here](https://vitejs.dev/guide/features.html#json)).
  - `pnpm create vite dvs-soti-2021 -- --template react` or `pnpm create vite -- --template react`. [`pnpm install`](https://pnpm.io/cli/install).
- `pnpm install -D eslint prettier eslint-config-prettier`.
- `pnpm install -D eslint-plugin-prettier`.
- `pnpm install -D eslint-plugin-react eslint-plugin-react-hooks`.
- `pnpm install -D eslint-plugin-jsx-a11y`.
- `pnpm install -D eslint-plugin-import`.
- `pnpm eslint --init`.
- `pnpm eslint --print-config .eslintrc.json > .eslintrc.allconfig.json`.
- `pnpm install @mantine/hooks @mantine/core`.
- `pnpm install phosphor-react`.
- `pnpm install -D eslint-plugin-lodash` ([repo](https://github.com/wix/eslint-plugin-lodash)).[Support ESLint 8.x](https://github.com/wix/eslint-plugin-lodash/issues/334) (open) issue.
- Online tools:
  - [Omatsuri](https://omatsuri.app/).
  - [Themera](https://themera.vercel.app/).
  - [Palx](https://github.com/jxnblk/palx).
  - [Smart Swatch](https://smart-swatch.netlify.app/).
- `pnpm install @visx/group @visx/axis d3-scale d3-format d3-array`.
- `pnpm install @visx/drag`.
- `pnpm install @visx/text`.
- `pnpm install @visx/grid`.
- Packages:
  - [react-indiana-drag-scroll](https://github.com/norserium/react-indiana-drag-scroll).
  - [Capsize](https://seek-oss.github.io/capsize/).
  - [Floating UI](https://github.com/floating-ui/floating-ui) (ex-Popper).
  - [Tippy.js for React](https://github.com/atomiks/tippyjs-react).
  - [kbar](https://github.com/timc1/kbar).
