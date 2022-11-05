import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = join(process.cwd(), 'blogs')

export function getPostSlugs () {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug (slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  interface Items {
    [key: string]: string | number
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })
  items.time = Math.round(readingTime(content).minutes)

  return items
}

export function getAllPosts (fields: any[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
