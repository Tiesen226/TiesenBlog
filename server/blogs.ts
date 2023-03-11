import {BlogPost, BlogDetail} from '@/types/blog'
import {discussionGql, discussionDetailGql} from './gql'

const API_URL = 'https://api.github.com/graphql'
const GH_ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN
const DISSCUSTION_CATEGORY_ID = process.env.DISSCUSTION_CATEGORY_ID

export async function getBlogs(): Promise<BlogPost[]> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({query: discussionGql(DISSCUSTION_CATEGORY_ID)}),
  })
  let res = await response.json()
  const discussions = res.data.repository.discussions.nodes

  const posts = discussions.map((discussion: any): BlogPost => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      bodyText,
      labels,
      url: discussionUrl,
    } = discussion

    const url = `/blog/${id}`
    const authorUrl = author.url
    const authorName = author.login
    const authorAvt = author.avatarUrl
    const tags: string[] = labels.nodes.map((tag: {name: string}) => tag.name)

    const post = {
      id,
      url,
      discussionUrl,
      title,
      html,
      bodyText,
      tags,
      createdAt,
      lastEdited,
      author: {url: authorUrl, name: authorName, avatar: authorAvt},
    }
    return post
  })
  return posts
}

export async function getBlogDetail(blogId: number): Promise<BlogDetail> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({query: discussionDetailGql(blogId)}),
  })
  let res = await response.json()
  let discussion = res.data.repository.discussion
  const {
    author: {url: authorUrl, login: authorName, avatarUrl: authorAvt},
    createdAt,
    title: title,
    bodyHTML: html,
  } = discussion

  const detail = {
    author: {url: authorUrl, name: authorName, avatar: authorAvt},
    createdAt,
    title,
    bodyHTML: html,
  }
  console.log(res)

  return detail
}
