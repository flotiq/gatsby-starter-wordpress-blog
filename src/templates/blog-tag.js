import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import PostListItem from "../components/post-list-item"
import Pagination from "../components/pagination"

class BlogTagTemplate extends React.Component {
  render() {

    console.log(this.props);
    const tag = this.props.data.wpTag;
    const posts = this.props.data.allWpPost.edges;
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={tag.name}
          description={tag.description}
        />
        <article>
          <header>
            <h2
              className="tag-name"
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {tag.name}
            </h2>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >

            </p>
          </header>
          <section dangerouslySetInnerHTML={{ __html: tag.description }} />
        </article>
        {posts.map(({ node }) => {
          return (
            <PostListItem node={node} key={node.id}/>
          )
        })}
        <Pagination totalCount={this.props.data.allWpPost.totalCount} limit={this.props.pageContext.limit} url={`/tag/${tag.slug}`} currentPage={this.props.pageContext.page} />
      </Layout>
    )
  }
}

export default BlogTagTemplate

export const pageQuery = graphql`
query BlogTagBySlug($slug: String!, $skip: Int!, $limit: Int!) {
  site {
    siteMetadata {
      title
    }
  }
  wpTag( slug: { eq: $slug } ) {
    description
    id
    name
    slug
  }
  allWpPost(limit: $limit, skip: $skip, sort: {fields: flotiqInternal___createdAt, order: DESC}, filter: {status: {eq: "publish"}, tags: {elemMatch: {slug: {eq: $slug}}}}) {
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
`;
