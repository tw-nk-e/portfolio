import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

// Métadonnées globales (onglet du navigateur, SEO, partage social).
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

// Le logo de la navbar. `logo` accepte n'importe quel JSX : on combine ici une
// icône SVG inline, le nom, et une courte accroche.
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

// La barre de navigation en haut.
const navbar = (
  <Navbar logo={logo} projectLink="https://github.com/USERNAME/mon-portfolio" />
)

// Le pied de page.
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
          // Alimente la sidebar de gauche à partir du dossier content/
          pageMap={await getPageMap()}
          // Lien "Éditer cette page" -> pointe vers ton repo
          docsRepositoryBase="https://github.com/USERNAME/mon-portfolio/tree/main"
          // Un CV n'a pas vraiment de "sidebar de docs" : on la garde discrète.
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          // Disable some links
          editLink={null}
          feedback={{ content: null }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
