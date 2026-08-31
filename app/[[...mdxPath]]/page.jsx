// Catch-all route mapping URLs to MDX files in content/.
// e.g. /about -> content/about.mdx
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'

// Pre-renders one static HTML page per MDX file at build time, required for
// the static export / GitHub Pages.
export const generateStaticParams = generateStaticParamsFor('mdxPath')

// Per-page metadata, read from the MDX frontmatter.
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
