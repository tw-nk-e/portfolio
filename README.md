# Portfolio

An interactive CV / portfolio written in **MDX**, rendered by
**[Nextra 4](https://nextra.site)** (built on Next.js), and deployed to
**GitHub Pages** automatically on every push.

The site is a **fully static export**: no server, no database, nothing to pay
for. Even the search ([Pagefind](https://pagefind.app)) runs entirely in the
browser. Adding a page means writing a Markdown file.

## Getting started

```bash
npm install     # install dependencies
npm run build   # required once: this is what builds the search index
npm run dev     # http://localhost:3000
```

Edit the files under `content/` — the page reloads on its own.

**The search index is a snapshot of the last build.** Editing an `.mdx` file
updates the page live, but not the search results: run `npm run search:index`
to reindex without rebuilding everything. With no build behind it, the search
box reports "Index de recherche indisponible"; the rest of the site works
normally.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Static build into `out/`, plus the search index |
| `npm run search:index` | Rebuilds the search index only |

## Layout

```
.
├── app/
│   ├── layout.jsx               # global chrome (navbar, footer, theme)
│   ├── globals.css              # global styles + the site's dotted backdrop
│   ├── icon.svg                 # favicon, and the footer logo
│   └── [[...mdxPath]]/page.jsx  # maps URLs onto the MDX files
├── components/                  # in-house components, usable from MDX
├── content/                     # ← your content lives here
│   ├── _meta.js                 # navigation order and labels
│   └── *.mdx                    # one file, one page
├── public/img/                  # images (logos, certification badges)
├── docs/                        # project documentation
├── mdx-components.js            # which React components render the Markdown
├── next.config.mjs              # Next.js config + static export
└── .github/workflows/deploy.yml # CI: build and deploy to Pages
```

## Writing a page

Create `content/my-page.mdx` and list it in `content/_meta.js`. That's the
whole procedure.

Every file opens with front matter:

```mdx
---
title: Shown in the browser tab and in search results
description: Summary used for SEO and link previews.
---
```

| Key | Purpose |
| --- | --- |
| `title` | Browser tab, SEO, and the search index |
| `description` | Meta description (SEO, social previews) |
| `searchable: false` | Keeps the page out of search. It stays reachable by URL |

Navigation order and labels are set in
[`content/_meta.js`](content/_meta.js): the key is the filename without its
extension, the value is the label to display.

The available components (`<Hero>`, `<Typewriter>`, `<Certifications>`…) are
documented in **[docs/components.md](docs/components.md)**.

## Deploying

One-time setup:

1. Push the repository to GitHub (branch `main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Every push to `main` rebuilds and publishes the site.

- Repository `mon-portfolio` → `https://USERNAME.github.io/mon-portfolio/`
- Repository named `USERNAME.github.io` → `https://USERNAME.github.io/`
  (set `PAGES_BASE_PATH: ""` in `.github/workflows/deploy.yml` for this case)

## Documentation

| File | Contents |
| --- | --- |
| [docs/components.md](docs/components.md) | The components you can use in MDX, with their props |
| [docs/search.md](docs/search.md) | How the Pagefind search works — read this when it breaks |

For anything beyond them, the [Nextra documentation](https://nextra.site/docs)
is authoritative.

## Still to do

1. **Replace the `USERNAME` placeholders** — still present in `app/layout.jsx`
   and `content/projects.mdx`.
2. **Rewrite the content** of `about.mdx`, `experience.mdx` and `projects.mdx`.
3. **Internationalisation** — Nextra handles FR/EN through locale subfolders.

## Author

Maxime DEVOULX — [github.com/tw-nk-e](https://github.com/tw-nk-e)

## License

The **source code** of this repository is licensed under the
[PolyForm Noncommercial License 1.0.0](./LICENSE.md).

You are free to use, copy, modify and share it for **any noncommercial
purpose** — including personal projects, learning and experimentation.
**Commercial use is not permitted.**

The **personal content** — including but not limited to the written copy,
biography, project descriptions, images, logo and the name "Maxime DEVOULX" —
is © Maxime DEVOULX, all rights reserved, and is **not** covered by the above
license. Please replace it with your own if you reuse this project.

> This project is source-available, not open source: unlike an OSI-approved
> open source license, the PolyForm Noncommercial License restricts commercial
> use.
