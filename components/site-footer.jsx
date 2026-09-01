import { Footer } from 'nextra-theme-docs'
import styles from './site-footer.module.css'

// `public/` and the App Router icons are served from the site sub-path
// (/<repo>/icon.svg) but Next does not prefix the URLs we write ourselves.
// Empty on a user site and in `next dev`. Same helper as cert-card.jsx.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const asset = path => (path.startsWith('/') ? basePath + path : path)

/**
 * Site footer: logo, copyright, attribution on a single pipe-separated row.
 *
 * Wraps the theme's <Footer> rather than replacing it, so the surrounding
 * chrome (background band, separator, safe-area padding) stays the theme's job.
 * The single full-width child is what pins the content to the left: the theme
 * puts `justify-center` on the <footer> itself, and filling the row leaves it
 * nothing to centre — no specificity fight with its utility classes.
 */
export function SiteFooter() {
  return (
    <Footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Decorative: the name is spelled out right beside it. */}
        <img
          className={styles.logo}
          src={asset('/icon.svg')}
          alt=""
          width={18}
          height={18}
        />
        {/* Punctuation, not content — kept out of the accessibility tree. */}
        <span className={styles.separator} aria-hidden="true">
          |
        </span>
        <span>© {new Date().getFullYear()} Maxime DEVOULX</span>
        <span className={styles.separator} aria-hidden="true">
          |
        </span>
        <span className={styles.muted}>Built with Nextra ❤️</span>
      </div>
    </Footer>
  )
}
