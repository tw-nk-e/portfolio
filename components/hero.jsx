import Link from 'next/link'
import { RevealFx } from './reveal-fx'
import styles from './hero.module.css'

/**
 * Home page hero, modelled on the Magic Portfolio layout: an optional badge,
 * a headline, a subline and a call to action — each revealed just after the
 * previous one.
 *
 * The 0 / 0.2 / 0.4s stagger and the translateY offsets are the template's own
 * values (src/app/page.tsx).
 *
 * The headline renders the page's <h1>, so keep the Markdown `#` title out of
 * the MDX file: one <h1> per page.
 */
export function Hero({ badge, headline, subline, cta }) {
  return (
    <header className={styles.hero}>
      <RevealFx as="h1" className={styles.headline} translateY={0.25}>
        {headline}
      </RevealFx>

      {badge && (
        <RevealFx className={styles.badgeRow} delay={0.1}>
          {/*
            Purely decorative, and deliberately not a link. The rotating border
            is the whole effect; there is no hover state, because reacting to
            the pointer on something you cannot click reads as a broken button.
          */}
          <span className={styles.badge}>
            <span className={styles.badgeGlow} aria-hidden="true" />
            <span className={styles.badgeInner}>{badge}</span>
          </span>
        </RevealFx>
      )}

      <RevealFx as="p" className={styles.subline} translateY={0.5} delay={0.2}>
        {subline}
      </RevealFx>

      {cta && (
        <RevealFx className={styles.actions} delay={0.4}>
          <Link className={styles.button} href={cta.href}>
            {cta.label}
            {/* Drawn entirely in CSS from two pseudo-elements. */}
            <span className={styles.arrow} aria-hidden="true" />
          </Link>
        </RevealFx>
      )}
    </header>
  )
}
