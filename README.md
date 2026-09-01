# Mon Portfolio

CV / portfolio interactif écrit en **MDX**, rendu par **[Nextra 4](https://nextra.site)**
(basé sur Next.js), et déployé automatiquement sur **GitHub Pages** via GitHub
Actions à chaque `git push`.

Le site est un **export 100 % statique** : pas de serveur, pas de base de
données, pas de coût d'hébergement. La recherche elle-même
([Pagefind](https://pagefind.app)) tourne entièrement dans le navigateur.
Écrire une page revient à créer un fichier Markdown.

## Démarrer

```bash
npm install     # installe les dépendances
npm run build   # obligatoire une fois : c'est lui qui construit l'index de recherche
npm run dev     # http://localhost:3000
```

Édite les fichiers de `content/` : la page se recharge toute seule.

**L'index de recherche est un instantané du dernier build.** Modifier un `.mdx`
met la page à jour à chaud, mais pas les résultats de recherche — relance
`npm run search:index` pour réindexer sans tout reconstruire. Sans build
préalable, la barre affiche « Index de recherche indisponible » ; le reste du
site fonctionne normalement.

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build statique dans `out/` + index de recherche |
| `npm run search:index` | Réindexe seulement la recherche |

## Structure

```
.
├── app/
│   ├── layout.jsx               # mise en page globale (navbar, footer, thème)
│   ├── globals.css              # styles globaux + fond décoratif du site
│   ├── icon.svg                 # favicon et logo du pied de page
│   └── [[...mdxPath]]/page.jsx  # relie les URLs aux fichiers MDX
├── components/                  # composants maison utilisables dans les MDX
├── content/                     # ← ton contenu, c'est ici que tu écris
│   ├── _meta.js                 # ordre + libellés de la navigation
│   └── *.mdx                    # une page = un fichier
├── public/img/                  # images (logos, badges de certification)
├── docs/                        # documentation du projet
├── next.config.mjs              # config Next.js + export statique
└── .github/workflows/deploy.yml # CI : build + déploiement Pages
```

## Écrire une page

Créer `content/ma-page.mdx`, l'ajouter dans `content/_meta.js`. Rien d'autre.

Chaque fichier commence par un front-matter :

```mdx
---
title: Titre affiché dans l'onglet et les résultats de recherche
description: Résumé pour le référencement et les partages sur les réseaux.
---
```

| Clé | Rôle |
| --- | --- |
| `title` | Titre de l'onglet, du référencement et de l'index de recherche |
| `description` | Méta-description (SEO, partages) |
| `searchable: false` | Exclut la page de la recherche. Elle reste accessible par URL |

L'ordre et les libellés de la navigation se règlent dans
[`content/_meta.js`](content/_meta.js) : la clé est le nom du fichier sans
extension, la valeur le libellé affiché.

Les composants disponibles (`<Hero>`, `<Typewriter>`, `<Certifications>`…) sont
documentés dans **[docs/components.md](docs/components.md)**.

## Déployer

À faire une seule fois :

1. Pousse le repo sur GitHub (branche `main`).
2. **Settings → Pages → Build and deployment → Source : GitHub Actions**.

Chaque push sur `main` reconstruit et publie le site.

- Repo `mon-portfolio` → `https://USERNAME.github.io/mon-portfolio/`
- Repo nommé `USERNAME.github.io` → `https://USERNAME.github.io/`
  (mettre alors `PAGES_BASE_PATH: ""` dans `.github/workflows/deploy.yml`)

## Documentation

| Fichier | Contenu |
| --- | --- |
| [docs/components.md](docs/components.md) | Les composants utilisables dans les MDX, avec leurs props |
| [docs/search.md](docs/search.md) | Fonctionnement de la recherche Pagefind — à lire si elle casse |

Pour le reste, la [documentation Nextra](https://nextra.site/docs) fait
autorité.

## Reste à faire

1. **Remplacer les `USERNAME`** — encore présents dans `app/layout.jsx` et
   `content/projects.mdx`.
2. **Reprendre le contenu** de `about.mdx`, `experience.mdx` et `projects.mdx`.
3. **Multilingue (i18n)** — Nextra gère le FR/EN via des sous-dossiers de locale.

## Auteur

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
