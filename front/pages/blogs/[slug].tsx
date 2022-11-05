import Head from 'next/head'
import { useRouter } from 'next/router'
import { Blog } from '.'
import PostBody from '../../components/post-body'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'

interface Props {
  blog: Blog
}

export default function Post ({ blog }: Props) {
  const router = useRouter()
  if (!router.isFallback && !blog?.slug) {
    return <p>This blog doesn't exist!</p>
  }
  return (
    <PostBody
      content={blog.content}
      image={blog.image}
      description={blog.description}
      title={blog.title}
      time={Math.round(blog.time)}
      date={blog.date}
    />
  )
}

interface Params {
  params: {
    slug: string
  }
}

export async function getStaticProps ({ params }: Params) {
  const blog = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'description',
    'keywords',
    'tags',
    'image',
    'time',
    'content'
  ])

  const content = await markdownToHtml((blog.content as string) || '')

  return {
    props: {
      blog: {
        ...blog,
        content
      }
    }
  }
}

export async function getStaticPaths () {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}
