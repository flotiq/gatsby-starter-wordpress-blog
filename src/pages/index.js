import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import './index.css';
import PostListItem from "../components/post-list-item"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allWpPost.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts"/>
          {posts.map(({ node }) => {
            return (
              <PostListItem node={node} key={node.id}/>
            )
          })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allWpPost(sort: {fields: flotiqInternal___createdAt, order: DESC}, filter: {status: {eq: "publish"}}) {
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
          description
          id
          name
          slug
          parentCategory {
            slug
            name
          }
        }
      }
    }
  }
`
