'use server'

import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import GithubSlugger from 'github-slugger'
import { writeFileSync } from 'fs'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import siteMetadata from './../../data/siteMetadata'

const isProduction = process.env.NODE_ENV === 'production'


interface FrontMatter {
  title?: string
  date: string | null
  lastmod?: string
  tags?: string[]
  draft?: boolean
  summary?: string
  layout?: string
  bibliography?: string
  slug: string
  path: string
  images?: string[]
}
const pipe =
  (...fns: Function[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x)
const map = (fn) => (input: any[]) => input.map(fn)

const pathJoinPrefix = (prefix: string) => (extraPath: string) => path.join(prefix, extraPath)
const walkDir = (fullPath: string): string | string[] => {
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}
const flattenArray = (input: any[]): any[] =>
  input.reduce((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], [])
const getAllFilesRecursively = (folder: string): string[] =>
  pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder)

function formatSlug(slug: string): string {
  return slug.replace(/\.(mdx|md)/, '')
}

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}

export async function generateSearchAndTagCount() {
  const root = process.cwd()
  const prefixPaths = path.join(root, 'data', 'blog')
  const files = getAllFilesRecursively(prefixPaths)

  const allFrontMatter: FrontMatter[] = files.reduce((acc: FrontMatter[], file: string) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return acc
    }
    const source = fs.readFileSync(file, 'utf8')
    const matterFile = matter(source)
    const slug = formatSlug(fileName)

    const frontmatter = matterFile.data
    if ('draft' in frontmatter && frontmatter.draft !== true) {
      acc.push({
        ...frontmatter,
        slug,
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
        path: 'blog/' + slug,
        filepath: fileName,
      } as FrontMatter)
    }
    return acc
  }, [])

  // Sort allFrontMatter based on date from new to old
  allFrontMatter.sort((a, b) => {
    const dateA = dayjs(a.date)
    const dateB = dayjs(b.date)
    return dateB.isAfter(dateA) ? 1 : -1
  })
  createTagCount(allFrontMatter)
  createSearchIndex(allFrontMatter)
}
