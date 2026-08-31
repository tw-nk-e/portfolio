// Ce fichier dit à Nextra quels composants React utiliser pour rendre le
// Markdown (titres, liens, tableaux, blocs de code...). On part des composants
// du thème "docs" et on peut en surcharger ici si besoin plus tard.
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components
  }
}
