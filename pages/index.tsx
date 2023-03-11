import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { BlogPost } from '@/types/blog'
import { getBlogs } from '../server/blogs'
import BlogReview from '@/components/BlogReview'
import { useState, useMemo } from 'react'

const Home: NextPage = ({
  blogData, tags
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([])
  const [selectedIndex, setSelectedIdx] = useState<number[]>([])
  const filterLabel = (tag: any, idx: number) => {
    if (selectedIndex.includes(idx)) {
      setSelectedIdx(selectedIndex.filter((id) => id !== idx))
      setFilterWord(filterWord.filter((filter) => filter !== tag.innerText))
    } else {
      setSelectedIdx([...selectedIndex, idx])
      setFilterWord([...filterWord, tag.innerText])
    }
  }

  const filteredBlog: BlogPost[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: BlogPost) => {
        return filterWord.every((filter) => blog.tags.includes(filter))
      })
      : blogData
  }, [filterWord])

  return (
    <main className="layout">
      <title> Tiesen </title>
      <section>
        <div className="mt-3 text-center">
          <h1 className="text-[3rem] font-bold">Welcome to my blog!</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </section>
      <section className="flex flex-col items-center text-[1.15rem] mt-12">
        <div className="flex gap-3 mb-12">
          {tags.map((tag: string, idx: number) => {
            return (
              <button
                key={idx}
                onClick={(e) => filterLabel(e.target, idx)}
                className={`${selectedIndex.includes(idx)
                  ? 'label-selected hover:bg-sky-400 transition-all duration-300'
                  : 'label hover:bg-sky-400 transition-all duration-300'
                  }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
        {filteredBlog.map((blog: BlogPost) => {
          return (
            <div
              key={blog.id}
              className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-300 transition-all duration-300"
            >
              <a href={blog.url} target="_blank" rel="noreferrer">
                <BlogReview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default Home
export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs()

  let tags: string[] = []
  for (const blog of blogs)
    for (const tag of blog.tags) if (!tags.includes(tag)) tags.push(tag)

  return {
    props: {
      blogData: blogs,
      tags: tags,
    },
  }
}
