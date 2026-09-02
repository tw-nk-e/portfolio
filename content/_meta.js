// Navigation order and labels (sidebar + navbar).
// Key = .mdx filename (without extension), value = displayed label.
export default {
  // Home stays served at `/` but is hidden from the sidebar: the navbar logo
  // already links back to it. `breadcrumb: false` avoids repeating the title
  // right above the `# h1`.
  index: {
    display: 'hidden',
    // `pagination: false`: `display: 'hidden'` shifts the navigation index, so
    // "next page" would point to Experience instead of About.
    theme: { toc: false, sidebar: false, breadcrumb: false, pagination: false },
  },
  about: {
    title: 'About Me',
    theme: { breadcrumb: false }
  }
}
