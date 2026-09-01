# Composants disponibles dans les MDX

Référence des composants utilisables dans les fichiers de `content/`.
Pour démarrer et déployer le projet, voir le [README](../README.md).

## Composants maison

Ils vivent dans `components/` et s'importent en chemin **relatif depuis
`content/`**, donc toujours avec `../components/`.

### `<Hero>`

Bandeau d'accueil : badge animé, titre, accroche et bouton d'appel à l'action,
chacun révélé légèrement après le précédent.

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

| Prop | Type | Rôle |
| --- | --- | --- |
| `headline` | texte ou JSX | Rend le `<h1>` de la page |
| `subline` | texte ou JSX | Accroche sous le titre |
| `badge` | texte ou JSX | Pastille à bordure animée. Décorative, non cliquable |
| `cta` | `{ label, href }` | Bouton avec chevron animé au survol |

> [!WARNING]
> `Hero` **produit le `<h1>` de la page**. N'écris pas de `# Titre` en Markdown
> à côté, sous peine d'avoir deux `<h1>` — mauvais pour le référencement et
> pour les lecteurs d'écran.

Le titre alimente aussi l'index de recherche : c'est lui qui apparaît comme
titre du résultat, pas le `title` du front-matter.

Réglages : vitesse de la bordure du badge via `--badge-speed` dans
[`components/hero.module.css`](../components/hero.module.css).

### `<Typewriter>`

Fait défiler des phrases caractère par caractère, en boucle.

```mdx
import { Typewriter } from '../components/typewriter'

<Typewriter
  text={['CloudOps', 'NetOps', 'DevOps & GitOps', 'SecOps', 'FinOps']}
  speed={100}
  loop={true}
/>
```

| Prop | Défaut | Rôle |
| --- | --- | --- |
| `text` | — | Une chaîne, ou une liste de chaînes à faire défiler |
| `speed` | `100` | Millisecondes par caractère à la frappe |
| `deleteSpeed` | `50` | Millisecondes par caractère à l'effacement |
| `delay` | `1500` | Pause sur une phrase terminée avant de l'effacer |
| `loop` | `false` | Recommence après la dernière phrase |
| `cursor` | `"|"` | Caractère du curseur |
| `className` | — | Pour surcharger la typographie |

Sans `loop`, la liste se déroule **une fois** en entier puis s'arrête. Toutes
les phrases sont présentes dans le HTML pour les lecteurs d'écran et pour
l'index de recherche, même celles non encore affichées.

### `<RevealFx>`

L'animation d'apparition utilisée par le `Hero` : balayage de gauche à droite,
léger flou et fondu. Utilisable seule pour animer n'importe quel bloc.

```mdx
import { RevealFx } from '../components/reveal-fx'

<RevealFx as="h2" delay={0.3} translateY={0.5}>
  Une section qui apparaît en douceur
</RevealFx>
```

| Prop | Défaut | Rôle |
| --- | --- | --- |
| `as` | `'div'` | Balise à produire |
| `delay` | `0` | Secondes avant le démarrage |
| `speed` | `1.5` | Durée en secondes |
| `translateY` | `0` | Décalage vertical de départ — nombre en `rem`, ou toute longueur CSS |

### `<Certifications>`

Grille de cartes de certification, avec pastille d'état calculée à partir de la
date d'expiration.

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

| Clé d'un item | Rôle |
| --- | --- |
| `title` | Nom de la certification |
| `href` | Lien externe, ouvert dans un nouvel onglet |
| `image` | Chemin depuis `public/`, ex. `/img/aws-sap.png` |
| `expires` | Date ISO `AAAA-MM-JJ`, optionnelle |

Comportement de `expires` : absente → aucune pastille (certification en cours) ;
future → « Active · until … » ; passée → badge grisé et pastille « Expired ».

Les images se déposent dans `public/img/`. Le chemin s'écrit **depuis la racine
du site** (`/img/...`) : le composant ajoute lui-même le préfixe GitHub Pages.

## Composants Nextra

Fournis par le thème, importables depuis `nextra/components` sans rien
installer :

```mdx
import { Cards, Callout, Steps, Tabs } from 'nextra/components'
```

Les plus utiles ici :

| Composant | Usage |
| --- | --- |
| `Cards` / `Cards.Card` | Grille de liens vers d'autres pages |
| `Callout` | Encart coloré (`type="default" \| "info" \| "warning" \| "error" \| "important"`) |
| `Steps` | Numérote automatiquement les titres qu'il contient |
| `Tabs` | Contenu à onglets |
| `FileTree` | Arborescence de fichiers |
| `Bleed` | Déborde de la colonne de contenu, pour une image large |
| `Button` | Bouton du thème |

Sont aussi exportés : `Banner`, `Collapse`, `ImageZoom`, `Mermaid`, `Playground`,
`Popup`, `Select`, `Head`, `Search`, `MathJax`. Voir la
[documentation Nextra](https://nextra.site/docs/built-ins).

Markdown standard, GFM (tableaux, listes de tâches) et blocs de code coloriés
fonctionnent partout, sans import.

> [!NOTE]
> Les alertes GitHub (`> [!NOTE]`, `> [!WARNING]`…) fonctionnent dans ce README,
> mais **pas dans les pages MDX** : aucun plugin de Nextra ne les transforme,
> elles y rendraient une simple citation. Utilise `<Callout>` à la place.
