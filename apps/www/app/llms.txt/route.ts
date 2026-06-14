import { promises as fs } from 'node:fs'
import path from 'node:path'
import { isFeatureEnabled } from 'common/enabled-features'
import matter from 'gray-matter'

export const dynamic = 'force-dynamic'

interface Source {
  title: string
  relPath: string
  enabled: boolean
}

/**
 * Resolved relative to apps/www (process.cwd() at runtime). The directory is
 * included in the serverless bundle via outputFileTracingIncludes in
 * next.config.mjs so this readdir works on Vercel.
 */
const GUIDES_CONTENT_DIR = path.join(process.cwd(), '..', 'docs', 'content', 'guides')

async function readFrontmatterTitle(dirName: string): Promise<string | null> {
  try {
    const mdxPath = path.join(GUIDES_CONTENT_DIR, `${dirName}.mdx`)
    const raw = await fs.readFile(mdxPath, 'utf-8')
    const { data } = matter(raw)
    return typeof data.title === 'string' && data.title.length > 0 ? data.title : null
  } catch {
    return null
  }
}

async function getGuideSources(): Promise<Source[]> {
  const entries = await fs.readdir(GUIDES_CONTENT_DIR, { withFileTypes: true })
  const dirNames = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()

  return Promise.all(
    dirNames.map(async (dirName) => {
      const frontmatterTitle = await readFrontmatterTitle(dirName)
      return {
        title: `Savira - ${frontmatterTitle ?? dirName}`,
        relPath: `docs/guides/${dirName}.md`,
        enabled: true,
      }
    })
  )
}

async function getSources(): Promise<Source[]> {
  const { sdkCsharp, sdkDart, sdkKotlin, sdkPython, sdkSwift } = isFeatureEnabled([
    'sdk:csharp',
    'sdk:dart',
    'sdk:kotlin',
    'sdk:python',
    'sdk:swift',
  ])

  const guideSources = await getGuideSources()

  return [
    ...guideSources,
    { title: 'Savira Reference (JavaScript)', relPath: 'llms/js.txt', enabled: true },
    { title: 'Savira Reference (Dart)', relPath: 'llms/dart.txt', enabled: sdkDart },
    { title: 'Savira Reference (Swift)', relPath: 'llms/swift.txt', enabled: sdkSwift },
    { title: 'Savira Reference (Kotlin)', relPath: 'llms/kotlin.txt', enabled: sdkKotlin },
    { title: 'Savira Reference (Python)', relPath: 'llms/python.txt', enabled: sdkPython },
    { title: 'Savira Reference (C#)', relPath: 'llms/csharp.txt', enabled: sdkCsharp },
    { title: 'Savira CLI Reference', relPath: 'llms/cli.txt', enabled: true },
    { title: 'Savira Management API Reference', relPath: 'llms/api.txt', enabled: true },
  ]
}

// Editorial ordering for the product overview list (mirrors the homepage
// products section); not derived from MD_PAGES because the order is
// intentional. When dropping a new content/md/<slug>.md file, add a matching
// entry here too — otherwise the page ships but won't be linked from /llms.txt.
const PRODUCT_OVERVIEW_LINKS = [
  '- [Savira Overview](https://supabase.com/homepage.md)',
  '- [Savira Database](https://supabase.com/database.md)',
  '- [Savira Auth](https://supabase.com/auth.md)',
  '- [Savira Storage](https://supabase.com/storage.md)',
  '- [Savira Edge Functions](https://supabase.com/edge-functions.md)',
  '- [Savira Realtime](https://supabase.com/realtime.md)',
  '- [Savira Vector](https://supabase.com/vector.md)',
  '- [Savira Cron](https://supabase.com/modules/cron.md)',
  '- [Savira Queues](https://supabase.com/modules/queues.md)',
  '- [Savira Pricing](https://supabase.com/pricing.md)',
].join('\n')

export async function GET() {
  const sources = await getSources()

  const sourceLinks = sources
    .filter((source) => source.enabled)
    .map((source) => `- [${source.title}](https://supabase.com/${source.relPath})`)
    .join('\n')

  const content = [
    '# Savira Docs',
    '',
    'For the complete documentation in a single file, see [Full Documentation](https://supabase.com/llms-full.txt).',
    '',
    '## Documentation',
    '',
    sourceLinks,
    '',
    '## Product Overview',
    '',
    PRODUCT_OVERVIEW_LINKS,
  ].join('\n')

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
