import Image from 'next/image'
import styles from './cert-card.module.css'

// Formats an ISO date ('2029-10-10') as 'Oct 2029'
function formatExpiry(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Grid of certification cards.
 *
 * Item shape: { title, href, image, expires? }
 * `expires` is an optional ISO 'YYYY-MM-DD' date driving the status:
 *  - missing -> no status (certification in progress)
 *  - past    -> dimmed badge + "Expired" pill
 *  - future  -> "Active · until <month year>" pill
 */
export function Certifications({ items = [] }) {
  const now = new Date()

  return (
    <div className={styles.grid}>
      {items.map(cert => {
        const expiry = cert.expires ? new Date(cert.expires) : null
        const isExpired = expiry ? expiry < now : false

        return (
          <a
            key={cert.title}
            href={cert.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.card}${isExpired ? ` ${styles.isExpired}` : ''}`}
          >
            <Image
              className={styles.badge}
              src={cert.image}
              alt={cert.title}
              width={72}
              height={72}
              unoptimized
            />
            <span className={styles.text}>
              <span className={styles.title}>{cert.title}</span>
              {expiry && (
                <span className={styles.status}>
                  <span className={isExpired ? styles.pillExpired : styles.pillActive}>
                    {isExpired ? 'Expired' : 'Active'}
                  </span>
                  <span className={styles.date}>
                    {isExpired ? 'since' : 'until'} {formatExpiry(cert.expires)}
                  </span>
                </span>
              )}
            </span>
          </a>
        )
      })}
    </div>
  )
}
