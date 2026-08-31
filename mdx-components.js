// Tells Nextra which React components render the Markdown (headings, links,
// tables, code blocks...). Starts from the "docs" theme, overridable here.
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'

// Default components from the theme
const themeComponents = getThemeComponents()

// Theme defaults, overridden by any caller-provided component
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components
  }
}
