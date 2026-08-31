import nextra from 'nextra'

// Configuration de Nextra (le plugin qui transforme les MDX en pages).
// On désactive la recherche Pagefind pour la v1 : elle demande une étape
// de build supplémentaire (indexation post-build) qui casse facilement
// l'export statique. C'est le premier exercice "level-up" (voir README).
const withNextra = nextra({
  search: false
})

// `basePath` : sur GitHub Pages "projet" (https://<user>.github.io/<repo>),
// le site est servi sous un sous-chemin /<repo>. On le lit depuis une
// variable d'environnement définie par le workflow GitHub Actions, pour ne
// jamais avoir à le coder en dur.
// - Site "projet"  -> PAGES_BASE_PATH = "/mon-portfolio"
// - Site "user"    (repo nommé <user>.github.io) -> laisser vide
const basePath = process.env.PAGES_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // génère un site 100% statique dans le dossier `out/`
  images: {
    unoptimized: true, // obligatoire avec `output: export`
  },
  basePath,
  // Utile pour GitHub Pages : ajoute un slash final -> /about/ au lieu de /about
  trailingSlash: true,
}

export default withNextra(nextConfig)
