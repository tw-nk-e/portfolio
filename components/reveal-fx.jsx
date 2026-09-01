import styles from './reveal-fx.module.css'

/**
 * Reveals its children with a left-to-right mask wipe, a blur and a slight
 * vertical lift — the effect Once UI ships as `<RevealFx>` in the Magic
 * Portfolio template.
 *
 * Implemented in pure CSS on purpose. Once UI drives the reveal from React
 * state, which means the *hidden* markup is what gets rendered first. On a
 * static export that would ship a blurred, masked-out hero and only reveal it
 * once React has hydrated — so the headline flashes in late on a slow link,
 * and never appears at all if the JS fails. A CSS animation starts on the
 * first paint and still ends in the right place with no JavaScript.
 *
 * - `delay`      seconds before the animation starts
 * - `speed`      duration in seconds
 * - `translateY` starting offset: a number in rem, or any CSS length
 * - `as`         element to render, defaults to a <div>
 *
 * Once UI's "medium" speed is 2s, which drags. The point of shortening it was
 * to spend less time in the half-revealed state — but now that the blur is
 * gentle and the fade is in place, that state holds up, so it does not need
 * rushing either. 1.5s sits between the two.
 */
export function RevealFx({
  children,
  as: Tag = 'div',
  delay = 0,
  speed = 1.5,
  translateY = 0,
  className,
  style,
  ...rest
}) {
  return (
    <Tag
      className={className ? `${styles.reveal} ${className}` : styles.reveal}
      style={{
        '--reveal-delay': `${delay}s`,
        '--reveal-duration': `${speed}s`,
        '--reveal-translate-y':
          typeof translateY === 'number' ? `${translateY}rem` : translateY,
        ...style
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
