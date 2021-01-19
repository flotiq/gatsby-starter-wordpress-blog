import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PostListItem from "./post-list-item"

const LatestPosts = () => {
  const data = useStaticQuery(graphql`
    query LatestPostsQuery {
      allWpPost(sort: {fields: flotiqInternal___createdAt, order: DESC}, filter: {status: {eq: "publish"}}, limit: 10) {
        edges {
          node {
            featuredMedia {
              extension
              id
            }
            author {
              name
              slug
            }
            categories {
              name
              slug
              id
            }
            modified
            excerpt
            slug
            title
            tags {
              slug
              name
              id
            }
            content
            status
            flotiqInternal {
              createdAt
            }
            created
            id
          }
        }
      }
      allWpCategory {
        edges {
          node {
            id
            slug
            name
          }
        }
      }
    }
  `);

  const posts = data.allWpPost.edges
  return (
    <section>
      <div className="categories-header">
        LATEST POSTS
      </div>
      {posts.map(({ node }) => {
        return (
          <PostListItem node={node} key={node.id} latest />
        )
      })}
    </section>
  )
};

export default LatestPosts
