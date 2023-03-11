import React from 'react'

interface Headerprops {
  createdAt: string
  author: {
    name: string
    avatar: string
    url: string
  }
}

const BlogHeader: React.FC<Headerprops> = (props) => {
  const { createdAt, author } = props
  const createdDate: Date = new Date(createdAt)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return (
    <div className="flex">
      <img
        className="rounded-[50%] mb-4 mr-4"
        src={author.avatar}
        alt="author profile picture"
        width={50}
        height={50}
      />
      <div className="flex flex-col">
        <div className="flex gap-4">
          <p className=" font-semibold text-[1rem]">{author.name}</p>
          <li className="font-normal ml-2 text-[0.85rem]">
            {createdDate.toLocaleDateString('en-US', options)}
          </li>
        </div>
        <a href={author.url} target="_blank" className="list-none font-normal text-[0.85rem]">{author.url}</a>


      </div>
    </div>
  )
}

export default BlogHeader
