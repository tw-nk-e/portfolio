# Components available in MDX

Reference for the components you can use inside `content/`. To run and deploy
the project, see the [README](../README.md).

## In-house components

They live in `components/` and are imported by a path **relative to
`content/`**, so always through `../components/`.

### `<Hero>`

Home page banner: animated badge, headline, tagline and call to action, each
revealed just after the previous one.

```mdx
import { Hero } from '../components/hero'

<Hero
  badge="Cloud Architect AWS · DevOps"
  headline="Concevoir des plateformes AWS qui tiennent dans le temps"
  subline={
    <>
      Je suis Maxime, <strong>Technical Leader Cloud (AWS)</strong>.
    </>
  }
  cta={{ label: 'About me', href: '/about' }}
/>
```

| Prop | Type | Purpose |
| --- | --- | --- |
| `headline` | text or JSX | Renders the page's `<h1>` |
| `subline` | text or JSX | Tagline under the headline |
| `badge` | text or JSX | Pill with an animated border. Decorative, not clickable |
| `cta` | `{ label, href }` | Button with a chevron that draws itself on hover |

> [!WARNING]
> `Hero` **produces the page's `<h1>`**. Do not write a Markdown `# Title`
> beside it, or the page ends up with two `<h1>` elements — bad for search
> engines and for screen readers.

That headline also feeds the search index: it is what shows up as the result
title, not the `title` from the front matter.

Tuning: the badge border speed lives in `--badge-speed`, at the top of
[`components/hero.module.css`](../components/hero.module.css).

### `<Typewriter>`

Types a list of phrases one character at a time, erases them, moves on.

```mdx
import { Typewriter } from '../components/typewriter'

<Typewriter
  text={['CloudOps', 'NetOps', 'DevOps & GitOps', 'SecOps', 'FinOps']}
  speed={100}
  loop={true}
/>
```

| Prop | Default | Purpose |
| --- | --- | --- |
| `text` | — | A string, or a list of strings to cycle through |
| `speed` | `100` | Milliseconds per character while typing |
| `deleteSpeed` | `50` | Milliseconds per character while erasing |
| `delay` | `1500` | How long a finished phrase is held before erasing |
| `loop` | `false` | Start over after the last phrase |
| `cursor` | `"\|"` | Cursor character |
| `className` | — | To override the typography |

Without `loop`, the list plays through **once** in full and then stops. Every
phrase is present in the HTML for screen readers and for the search index,
including those not yet typed out.

### `<RevealFx>`

The reveal animation the `Hero` is built on: a left-to-right wipe, a light blur
and a fade. Usable on its own to bring in any block.

```mdx
import { RevealFx } from '../components/reveal-fx'

<RevealFx as="h2" delay={0.3} translateY={0.5}>
  A section that eases into view
</RevealFx>
```

| Prop | Default | Purpose |
| --- | --- | --- |
| `as` | `'div'` | Element to render |
| `delay` | `0` | Seconds before the animation starts |
| `speed` | `1.5` | Duration in seconds |
| `translateY` | `0` | Starting vertical offset — a number in `rem`, or any CSS length |

### `<Certifications>`

Grid of certification cards, with a status pill derived from the expiry date.

```mdx
import { Certifications } from '../components/cert-card'

<Certifications
  items={[
    {
      title: 'AWS Certified Solutions Architect – Professional',
      href: 'https://aws.amazon.com/certification/certified-solutions-architect-professional',
      image: '/img/aws-sap.png',
      expires: '2029-10-10'
    }
  ]}
/>
```

| Item key | Purpose |
| --- | --- |
| `title` | Name of the certification |
| `href` | External link, opened in a new tab |
| `image` | Path from `public/`, e.g. `/img/aws-sap.png` |
| `expires` | ISO date `YYYY-MM-DD`, optional |

How `expires` behaves: missing → no pill at all (certification in progress);
in the future → "Active · until …"; in the past → dimmed badge and an
"Expired" pill.

Images go in `public/img/`. Write the path **from the site root**
(`/img/...`): the component adds the GitHub Pages prefix itself.

## Nextra components

Shipped with the theme, importable from `nextra/components` with nothing to
install:

```mdx
import { Cards, Callout, Steps, Tabs } from 'nextra/components'
```

The ones that earn their place here:

| Component | Use |
| --- | --- |
| `Cards` / `Cards.Card` | Grid of links to other pages |
| `Callout` | Coloured box (`type="default" \| "info" \| "warning" \| "error" \| "important"`) |
| `Steps` | Numbers the headings it contains, automatically |
| `Tabs` | Tabbed content |
| `FileTree` | File tree diagram |
| `Bleed` | Breaks out of the content column, for a wide image |
| `Button` | The theme's button |

Also exported: `Banner`, `Collapse`, `ImageZoom`, `Mermaid`, `Playground`,
`Popup`, `Select`, `Head`, `Search`, `MathJax`. See the
[Nextra documentation](https://nextra.site/docs/built-ins).

Plain Markdown, GFM (tables, task lists) and syntax-highlighted code blocks
work everywhere, with no import.

> [!NOTE]
> GitHub alerts (`> [!NOTE]`, `> [!WARNING]`…) work in this file, but **not in
> MDX pages**: no Nextra plugin transforms them, so they would render as a
> plain blockquote. Use `<Callout>` there instead.
