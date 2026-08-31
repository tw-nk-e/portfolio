// Route "attrape-tout" : c'est la passerelle entre les URLs et tes fichiers
// MDX dans content/. Ex: /about  ->  content/about.mdx
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

// Génère au build une page HTML statique pour chaque MDX (indispensable
// pour l'export statique / GitHub Pages).
export const generateStaticParams = generateStaticParamsFor('mdxPath')

// Métadonnées par page, lues depuis le frontmatter du MDX.
export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
  const params = await props.params
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode
  } = await importPage(params.mdxPath)
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
