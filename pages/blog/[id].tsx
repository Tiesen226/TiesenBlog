import { getBlogDetail } from '@/server/blogs'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import parse from 'html-react-parser'
import detail from './id.module.css'
import BlogHeader from '@/components/BlogHeader'

const BlogPost: NextPage = ({
  blogData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { author, bodyHTML, createdAt, title } = blogData
  return (
    <section className="layout">
      <title>{title}</title>
      <div className="max-w-[50%]">
        <h1 className="text-center my-10 text-[2rem] font-bold">{title}</h1>
        <div className="flex justify-center mb-4">
          <BlogHeader createdAt={createdAt} author={author} />
        </div>
      </div>
      <div className={`${detail.html} flex flex-col overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4`}>
        {parse(bodyHTML)}
      </div>
    </section>
  )
}

export default BlogPost

export const getServerSideProps: GetServerSideProps = async (context) => {
  const rounte: string[] | string | undefined = context.query.id
  console.log(rounte)
  const id = Number(rounte)
  let blogDetail = await getBlogDetail(id)

  return {
    props: {
      blogData: blogDetail,
    },
  }
}
