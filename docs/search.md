# Moteur de recherche (Pagefind)

Adaptation de la [doc Nextra](https://nextra.site/docs/guide/search) à **ce**
projet : export statique (`output: 'export'`) + `basePath` variable + GitHub
Pages.

Nextra 4 utilise [Pagefind](https://pagefind.app) : un moteur de recherche
100 % client. Il indexe les fichiers **`.html` déjà construits** — il n'y a donc
pas d'index tant qu'un build n'a pas eu lieu, et aucun serveur n'est nécessaire
à l'exécution.

## Ce qui a été mis en place

| Fichier | Rôle |
| --- | --- |
| `package.json` | `pagefind` en `devDependency` + scripts `postbuild` / `search:*` |
| `next.config.mjs` | `search: { codeblocks: false }` |
| `app/layout.jsx` | `<Search>` avec les libellés en français |
| `.gitignore` | `/public/_pagefind/` (index généré, jamais commité) |

### Le point clé : deux copies de l'index

Pagefind ne sait écrire que dans **un** dossier à la fois, mais les deux modes
de fonctionnement ne lisent pas au même endroit :

- **`npm run dev`** sert les fichiers statiques depuis `public/` →
  il lui faut `public/_pagefind/`
- **export statique** (`out/`) est produit par `next build`, donc *avant* que
  l'index n'existe → il lui faut `out/_pagefind/` écrit après coup

D'où la double génération dans `search:index` :

```json filename="package.json"
"predev": "node -e \"require('fs').existsSync('public/_pagefind')||console.warn('...')\"",
"prebuild": "npm run search:clean",
"build": "next build",
"postbuild": "npm run search:index",
"search:clean": "node -e \"const r=require('fs').rmSync,o={recursive:true,force:true};r('out/_pagefind',o);r('public/_pagefind',o)\"",
"search:index": "npm run search:clean && pagefind --site out --output-path out/_pagefind && pagefind --site out --output-path public/_pagefind"
```

Notes :

- `prebuild` / `postbuild` sont des **hooks npm natifs** : ils s'exécutent tout
  seuls autour de `npm run build`, en local comme dans la CI. Rien à ajouter au
  workflow.
- `prebuild` est indispensable : `public/` est une **entrée** de `next build`
  (Next le recopie dans `out/`). Sans nettoyage préalable, le build recopierait
  l'index du run précédent dans `out/_pagefind` avant que `postbuild` ne le
  régénère. Ça s'auto-répare, mais si le build échoue entre l'export et
  l'indexation, `out/` contient un index périmé d'apparence valide. On coupe la
  boucle entrée/sortie à la source.
- L'index est construit depuis `out/` (le vrai HTML exporté), pas depuis
  `.next/server/app` comme le montre la doc générique de Nextra : avec
  `output: 'export'` c'est `out/` qui fait foi, et les URLs y sont déjà
  correctes grâce à `trailingSlash: true`.
- `search:clean` évite l'accumulation de fragments périmés : Pagefind
  **n'efface pas** son dossier de sortie avant d'écrire. Sans ce nettoyage,
  `public/_pagefind/fragment/` grossit à chaque build.
- `predev` se contente d'**avertir** si l'index manque — il ne bloque jamais
  `npm run dev`.

## Utilisation en local (`npm run dev`)

```sh
npm install
npm run build   # obligatoire une fois : c'est lui qui crée l'index
npm run dev
```

La recherche est alors disponible sur <http://localhost:3000>.

> [!IMPORTANT]
>
> L'index est un **instantané du dernier build**. En dev, modifier une page MDX
> met à jour la page à chaud, mais *pas* les résultats de recherche. Relancez
> `npm run build` (ou juste `npm run search:index`) pour réindexer.

Sans index, `next dev` renvoie 404 sur `/_pagefind/pagefind.js` : la barre de
recherche affiche « Index de recherche indisponible » et la console logue
`[nextra] Error while loading { pathSegments: [ '_pagefind', ... ] }`. C'est
attendu, ce n'est pas un crash — le site reste parfaitement navigable.

## Utilisation sur GitHub Pages

Le workflow `.github/workflows/deploy.yml` lance `npm ci` puis `npm run build`.
`postbuild` s'enchaîne automatiquement, et `out/_pagefind/` part dans
l'artefact Pages. **Aucune modification du workflow n'est nécessaire.**

### Pourquoi ça marche aussi avec un `basePath`

C'est le seul vrai piège du montage. Deux chemins entrent en jeu :

1. **Le chargement du bundle.** Nextra appelle
   `addBasePath('/_pagefind/pagefind.js')` : Next préfixe donc tout seul le
   `basePath` → `/mon-portfolio/_pagefind/pagefind.js`. Et comme le chemin se
   termine par une extension, `trailingSlash: true` ne lui ajoute *pas* de
   slash final (qui casserait l'import).
2. **Les URLs des résultats.** Avec `output: 'export'`, Next écrit dans `out/`
   **sans** imbriquer le `basePath`. Pagefind produit donc des URLs racine
   (`/about/`, `/projects/`…). Nextra les passe à `next/link` et
   `router.push()`, qui rajoutent le `basePath` à la navigation.

Les deux bouts se recollent : **rien n'est à coder en dur**, et le même `out/`
fonctionne à la racine d'un domaine comme sous `/mon-portfolio/`.

## Configuration

`search` dans `next.config.mjs` ne pilote **pas** l'affichage de la barre de
recherche (elle vient du thème `nextra-theme-docs`). Il ne contrôle que le
balisage HTML utilisé par l'indexation :

```js filename="next.config.mjs"
const withNextra = nextra({
  search: { codeblocks: false } // <pre> marqués data-pagefind-ignore
})
```

- `search: { codeblocks: false }` — indexe le texte, ignore les blocs de code.
  C'est le réglage retenu : sur un portfolio, les extraits de code polluent les
  résultats.
- `search: true` — indexe aussi les blocs de code.
- `search: false` — n'ignore plus rien de particulier ; **ne masque pas** la
  barre de recherche.

Pour retirer une page de l'index, mettez `searchable: false` dans son
front-matter — c'est ce qui pilote l'attribut `data-pagefind-body` sur `<main>`.

Pour masquer complètement la barre : `<Layout search={null} …>` dans
`app/layout.jsx`.

## Versions

| Paquet | Version | Remarque |
| --- | --- | --- |
| `pagefind` | `1.5.2` (figée) | version exacte, sans `^` : le binaire est téléchargé depuis npm, on évite toute dérive |
| `nextra` / `nextra-theme-docs` | `4.5.1` | Pagefind n'est *pas* une dépendance de Nextra, juste un producteur d'index |
| Node | 24 LTS (CI) / ≥ 18.18 | `pagefind` publie des binaires linux-x64, darwin-arm64, windows-x64… |

Pagefind n'est utilisé qu'au **build** : rien n'est ajouté aux dépendances de
production, et l'index livré n'est que du statique (JSON compressé + WebAssembly).
