export function discussionGql(ghDiscussionsCategoryID: string | undefined) {
  return `{
    repository(owner: "Tiesen226", name: "TiesenBlog"){
      discussions(first:10, categoryId:"${ghDiscussionsCategoryID}") {
        nodes {
            title
            url
            number
            bodyHTML
            bodyText
            createdAt
            lastEditedAt
            author {
              login
              url
              avatarUrl
            }
            labels(first:100) {
              nodes {
                  name 
              }
            }
          
        }
      }
    }
  }`
}

//single post
export function discussionDetailGql(postId: number | undefined) {
  return `{
    repository(owner: "Tiesen226", name: "TiesenBlog"){
      discussion(number: ${postId}) {
        title
        bodyHTML
        createdAt
        author {
          login
          url
          avatarUrl
        }
      }
    }
  }`
}
