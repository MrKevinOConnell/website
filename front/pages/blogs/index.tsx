import { Stack } from '@mantine/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import readingTime from 'reading-time'
import PostCard from '../../components/PostCard'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
export interface Blog {
  slug: string
  title: string
  date: string
  description: string
  keywords: string
  tags: string[]
  image: string
  content: string
  time: number
}

interface Props {
  blogs: Blog[]
}

export default function blogs ({ blogs }: Props) {
  return (
    <Stack align="center">
      {blogs &&
        blogs.map((blog) => {
          return <PostCard key={blog.slug} blog={blog} />
        })}
    </Stack>
  )
}

interface Params {
  params: {
    slug: string
  }
}

export const getStaticProps = async () => {
  const blogs = await getAllPosts([
    'title',
    'date',
    'slug',
    'description',
    'keywords',
    'tags',
    'image',
    'time'
  ])
  return {
    props: { blogs }
  }
}
