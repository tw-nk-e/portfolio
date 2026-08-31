import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

// Site-wide metadata (browser tab, SEO, social sharing).
export const metadata = {
  title: {
    default: 'mdevoulx - Technical Leader Cloud & more.',
    // template: '%s | Maxime DEVOULX'
  },
  description:
    'Concevez des plateformes AWS solides, sécurisées et automatisées, pensées pour durer. ' +
    "[Prénom Nom] est un expert Cloud AWS fort de plus de 10 ans d'expérience, " +
    'qui aide équipes et entreprises à réussir sur le Cloud.'
}

// Navbar logo. `logo` accepts any JSX: inline SVG icon + tagline.
const logo = (
  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 512 512"
      role="img"
      aria-label="Logo MD"
      style={{ flexShrink: 0 }}
    >
      <rect x="16" y="16" width="480" height="480" rx="96" fill="#8b5cf6" />
      <text
        x="256"
        y="256"
        textAnchor="middle"
        dy="0.35em"
        fontFamily="system-ui, sans-serif"
        fontSize="210"
        fontWeight="700"
        fill="#ffffff"
      >
        MD
      </text>
    </svg>
    <b>Technical Leader Cloud</b>
  </span>
)

// Top navigation bar.
const navbar = (
  <Navbar logo={logo} projectLink="https://github.com/USERNAME/mon-portfolio" />
)

// Page footer.
const footer = (
  <Footer>
    © {new Date().getFullYear()} Maxime DEVOULX — Construit avec Nextra.
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          // Builds the left sidebar from the content/ folder
          pageMap={await getPageMap()}
          // Target of the "Edit this page" link
          docsRepositoryBase="https://github.com/USERNAME/mon-portfolio/tree/main"
          // A resume needs no docs sidebar: keep it collapsed and unobtrusive
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          // Docs-only links, irrelevant here
          editLink={null}
          feedback={{ content: null }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
