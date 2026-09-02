# Search engine (Pagefind)

The [Nextra guide](https://nextra.site/docs/guide/search) adapted to **this**
project: static export (`output: 'export'`), a variable `basePath`, and GitHub
Pages.

Nextra 4 uses [Pagefind](https://pagefind.app), a fully client-side search
engine. It indexes the **`.html` files that have already been built** — so
there is no index until a build has run, and nothing is needed at runtime.

## What is in place

| File | Role |
| --- | --- |
| `package.json` | `pagefind` as a `devDependency`, plus the `postbuild` / `search:*` scripts |
| `next.config.mjs` | `search: { codeblocks: false }` |
| `app/layout.jsx` | `<Search>` with French labels |
| `.gitignore` | `/public/_pagefind/` (generated index, never committed) |

### The crux: two copies of the index

Pagefind writes to **one** directory at a time, but the two ways of running the
site read from different places:

- **`npm run dev`** serves static files out of `public/` → it needs
  `public/_pagefind/`
- **the static export** (`out/`) is produced by `next build`, so *before* the
  index exists → it needs `out/_pagefind/`, written afterwards

Hence the double pass in `search:index`:

```json filename="package.json"
"predev": "node -e \"require('fs').existsSync('public/_pagefind')||console.warn('...')\"",
"prebuild": "npm run search:clean",
"build": "next build",
"postbuild": "npm run search:index",
"search:clean": "node -e \"const r=require('fs').rmSync,o={recursive:true,force:true};r('out/_pagefind',o);r('public/_pagefind',o)\"",
"search:index": "npm run search:clean && pagefind --site out --output-path out/_pagefind && pagefind --site out --output-path public/_pagefind"
```

Notes:

- `prebuild` and `postbuild` are **native npm hooks**: they run on their own
  around `npm run build`, locally and in CI alike. Nothing to add to the
  workflow.
- `prebuild` is not optional. `public/` is an **input** to `next build` (Next
  copies it into `out/`), so without a prior clean the build would carry the
  previous run's index into `out/_pagefind` before `postbuild` regenerates it.
  That self-heals — but if the build fails between the export and the indexing,
  `out/` is left holding a stale index that still looks valid. Cutting the
  input/output loop at the source avoids the whole class of problem.
- The index is built from `out/` — the HTML that actually ships — not from
  `.next/server/app` as Nextra's generic guide shows. With `output: 'export'`,
  `out/` is the source of truth, and its URLs are already correct thanks to
  `trailingSlash: true`.
- `search:clean` prevents stale fragments piling up: Pagefind **does not** wipe
  its output directory before writing. Without it, `public/_pagefind/fragment/`
  grows with every build.
- `predev` only ever **warns** when the index is missing. It never blocks
  `npm run dev`.

## Running locally (`npm run dev`)

```sh
npm install
npm run build   # required once: this is what creates the index
npm run dev
```

Search is then available at <http://localhost:3000>.

> [!IMPORTANT]
>
> The index is a **snapshot of the last build**. In development, editing an MDX
> page updates the page live but *not* the search results. Run `npm run build`
> again — or just `npm run search:index` — to reindex.

With no index, `next dev` returns 404 on `/_pagefind/pagefind.js`: the search
box reports "Index de recherche indisponible" and the console logs
`[nextra] Error while loading { pathSegments: [ '_pagefind', ... ] }`. That is
expected, not a crash — the site stays perfectly usable.

## Running on GitHub Pages

The `.github/workflows/deploy.yml` workflow runs `npm ci` then `npm run build`.
`postbuild` follows on its own, and `out/_pagefind/` goes into the Pages
artifact. **The workflow needs no changes at all.**

### Why it survives a `basePath`

This is the one genuine trap in the setup. Two separate paths are involved:

1. **Loading the bundle.** Nextra calls
   `addBasePath('/_pagefind/pagefind.js')`, so Next prefixes the `basePath`
   itself → `/mon-portfolio/_pagefind/pagefind.js`. And because the path ends
   in a file extension, `trailingSlash: true` does *not* append a trailing
   slash — which would break the import.
2. **The result URLs.** With `output: 'export'`, Next writes into `out/`
   **without** nesting it under the `basePath`. Pagefind therefore produces
   root-relative URLs (`/about/`, `/projects/`…). Nextra hands those to
   `next/link` and `router.push()`, which add the `basePath` back on
   navigation.

The two ends meet: **nothing is hardcoded**, and the same `out/` works at a
domain root or under `/mon-portfolio/`.

## Configuration

`search` in `next.config.mjs` does **not** control whether the search box is
displayed — that comes from the `nextra-theme-docs` theme. It only controls the
HTML markup used for indexing:

```js filename="next.config.mjs"
const withNextra = nextra({
  search: { codeblocks: false } // <pre> tagged data-pagefind-ignore
})
```

- `search: { codeblocks: false }` — indexes prose, ignores code blocks. This is
  the setting in use: on a portfolio, code snippets only pollute the results.
- `search: true` — indexes code blocks as well.
- `search: false` — stops ignoring anything in particular. It does **not** hide
  the search box.

To keep a page out of the index, set `searchable: false` in its front matter —
that is what drives the `data-pagefind-body` attribute on `<main>`.

To remove the search box entirely: `<Layout search={null} …>` in
`app/layout.jsx`.

## Versions

| Package | Version | Note |
| --- | --- | --- |
| `pagefind` | `1.5.2` (pinned) | Exact version, no `^`: the binary is downloaded from npm, so drift is worth avoiding |
| `nextra` / `nextra-theme-docs` | `4.5.1` | Pagefind is *not* a Nextra dependency, just an index producer |
| Node | 24 LTS (CI) / ≥ 18.18 | `pagefind` ships binaries for linux-x64, darwin-arm64, windows-x64… |

Pagefind is a **build-time** tool only: nothing is added to the production
dependencies, and what ships is plain static files (compressed JSON plus
WebAssembly).
