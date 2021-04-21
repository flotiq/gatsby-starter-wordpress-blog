import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import '../pages/index.css';
import PostListItem from "../components/post-list-item"
import Pagination from '../components/pagination';

class BlogList extends React.Component {
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
          <Pagination totalCount={data.allWpPost.totalCount} limit={this.props.pageContext.limit} url="/posts" currentPage={this.props.pageContext.page} />
      </Layout>
    )
  }
}

export default BlogList

export const pageQuery = graphql`
  query ListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allWpPost(limit: $limit, skip: $skip, sort: {fields: created, order: DESC}, filter: {status: {eq: "publish"}}) {
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
      totalCount
    }
  }
`
