import React from 'react'
import { BlogPost } from '@/types/blog'
import BlogHeader from './BlogHeader'

const BlogReview: React.FC<BlogPost> = (props) => {
  const { bodyText, title, createdAt, tags, author } = props
  const previewText: string = bodyText.substring(0, 50) + '...'
  return (
    <section>
      <BlogHeader createdAt={createdAt} author={author} />
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2">{previewText}</p>
      <div className="flex gap-3">
        {tags.map((tag, idx) => (
          <p className="label" key={idx}>
            {tag}
          </p>
        ))}
      </div>
    </section>
  )
}

export default BlogReview
