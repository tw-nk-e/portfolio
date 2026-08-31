// Contrôle l'ordre et les libellés dans la navigation (sidebar + navbar).
// La clé = nom du fichier .mdx (sans extension). La valeur = libellé affiché.
export default {
  // La page d'accueil reste servie sur `/`, mais on la retire de la sidebar :
  // le logo de la navbar y ramène déjà.
  // `breadcrumb: false` évite de répéter le titre juste au-dessus du `# h1`.
  index: {
    display: 'hidden',
    // `pagination: false` : masquée car `display: 'hidden'` décale l'index de
    // navigation, la page "suivante" pointerait sur Experience au lieu d'About.
    theme: { toc: false, sidebar: false, breadcrumb: false, pagination: false }
  },
  about: 'About',
  experience: 'Experiences',
  projects: 'Projects',
}
