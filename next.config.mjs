import nextra from 'nextra'

// Nextra turns the MDX files into pages.
const withNextra = nextra({
  // Pagefind search is off: its post-build indexing step easily breaks the
  // static export (first "level-up" exercise, see README).
  search: false
})

// Sub-path the site is served from, injected by the GitHub Actions workflow
// so it is never hardcoded.
// - Project site (<user>.github.io/<repo>) -> PAGES_BASE_PATH = "/<repo>"
// - User site (repo named <user>.github.io) -> leave empty
const basePath = process.env.PAGES_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Generates a 100% static site in the `out/` folder.
  images: {
    unoptimized: true, // Mandatory with `output: export`.
  },
  basePath,
  // Useful for GitHub Pages: adds a trailing slash -> /about/ instead of /about .
  trailingSlash: true,
}

export default withNextra(nextConfig)
