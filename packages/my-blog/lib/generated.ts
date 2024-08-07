const matter=require('gray-matter')
const fs=require('fs')
const path=require('path')
const dayjs=require('dayjs')
const GithubSlugger=require('github-slugger')
const plinyUtils=require('pliny/utils/contentlayer.js')
const siteMetadata=require('./../../data/siteMetadata')
const isProduction = process.env.NODE_ENV === 'production'


const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x)

const flattenArray = (input) =>
  input.reduce((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], [])

const map = (fn) => (input) => input.map(fn)

const walkDir = (fullPath) => {
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = (prefix) => (extraPath) => path.join(prefix, extraPath)

const getAllFilesRecursively = (folder) =>
  pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder)

function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, '')
}


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
  fs.writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    // console.log('blog----',allCoreContent(sortPosts(allBlogs)) )

    fs.writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(plinyUtils.allCoreContent(plinyUtils.sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}

class SimplePlugin {
  // 构造函数，接受插件选项
  constructor(options) {
    this.options = options;
  }

  // apply 方法用于注册钩子
  apply(compiler) {
    // 注册在编译开始时的钩子
    compiler.hooks.watchRun.tap('WatchRunPlugin', (compilation) => {
      const root = process.cwd()
      const prefixPaths = path.join(root, 'data', 'blog')
      const files = getAllFilesRecursively(prefixPaths)

      const allFrontMatter = files.reduce((acc, file) => {
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
          })
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
    });
  }
}

module.exports = SimplePlugin;
