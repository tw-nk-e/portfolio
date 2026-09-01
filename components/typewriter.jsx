'use client'

import { useEffect, useRef } from 'react'
import styles from './typewriter.module.css'

/**
 * Types a list of phrases one character at a time, erases them, moves on.
 * Same API as HextaUI's <Typewriter>, driven differently.
 *
 * The animation writes to the DOM through a ref instead of React state, so the
 * component renders **once** and never again. The upstream version keeps the
 * typed string in state with `displayText` in the effect deps, which costs a
 * render and an effect teardown per character — ten a second, forever, for a
 * decorative line. Nothing here needs to participate in reconciliation: no
 * other part of the tree reads the typed text.
 *
 * React only ever renders `<span ref>` with no children, so it has nothing to
 * reconcile inside it and leaves our text node alone.
 *
 * - `text`        a string, or a list of strings to cycle through
 * - `speed`       ms per character while typing
 * - `cursor`      trailing character
 * - `loop`        restart after the last phrase
 * - `deleteSpeed` ms per character while erasing
 * - `delay`       ms to hold a finished phrase before erasing it
 */
export function Typewriter({
  text,
  speed = 100,
  cursor = '|',
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className
}) {
  const outputRef = useRef(null)

  const phrases = (Array.isArray(text) ? text : [text]).filter(Boolean)
  // A single primitive standing in for the list, so the effect does not
  // restart on every parent render just because the array literal is new.
  const key = JSON.stringify(phrases)

  useEffect(() => {
    const node = outputRef.current
    if (!node) return

    const list = JSON.parse(key)
    if (!list.length) return

    // Typing is a lot of motion. Honour the OS setting and just show the text.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = list[0]
      return
    }

    let timer
    let phrase = 0
    let count = 0
    let erasing = false

    const step = () => {
      const current = list[phrase]

      if (!erasing) {
        count += 1
        node.textContent = current.slice(0, count)

        if (count === current.length) {
          // Unlike upstream, a non-looping run plays the whole list once
          // rather than stopping on the first phrase.
          if (phrase === list.length - 1 && !loop) return
          erasing = true
          timer = setTimeout(step, delay)
          return
        }
        timer = setTimeout(step, speed)
        return
      }

      count -= 1
      node.textContent = current.slice(0, count)

      if (count === 0) {
        erasing = false
        phrase = (phrase + 1) % list.length
      }
      timer = setTimeout(step, erasing ? deleteSpeed : speed)
    }

    node.textContent = ''
    timer = setTimeout(step, speed)

    // One timer alive at a time, and it dies with the effect.
    return () => clearTimeout(timer)
  }, [key, speed, deleteSpeed, delay, loop])

  return (
    <span className={className ? `${styles.line} ${className}` : styles.line}>
      {/*
        Screen readers get every phrase once, as stable text. The animated copy
        is hidden from them: a string mutating ten times a second is unusable,
        and some readers announce it on every change. It also means the content
        is in the HTML for crawlers and for the search index.
      */}
      <span className={styles.srOnly}>{phrases.join('. ')}</span>
      <span aria-hidden="true">
        <span ref={outputRef} />
        <span className={styles.cursor}>{cursor}</span>
      </span>
    </span>
  )
}
