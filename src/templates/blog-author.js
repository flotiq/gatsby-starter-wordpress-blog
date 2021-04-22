import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import PostListItem from "../components/post-list-item"
import Pagination from "../components/pagination"

class BlogAuthorTemplate extends React.Component {
  render() {
    const author = this.props.data.wpAuthor;
    const posts = this.props.data.allWpPost.edges;
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={author.name}
          description={author.description}
        />
        <article>
          <header>
            <h2
              className="category-name"
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {author.name}
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
          <section dangerouslySetInnerHTML={{ __html: author.description }} />
        </article>
        {posts.map(({ node }) => {
          return (
            <PostListItem node={node} key={node.id}/>
          )
        })}
        <Pagination totalCount={this.props.data.allWpPost.totalCount} limit={this.props.pageContext.limit} url={`/author/${author.slug}`} currentPage={this.props.pageContext.page} />
      </Layout>
    )
  }
}

export default BlogAuthorTemplate

export const pageQuery = graphql`
query BlogAuthorBySlug($slug: String!, $skip: Int!, $limit: Int!) {
  site {
    siteMetadata {
      title
    }
  }
  wpAuthor( slug: { eq: $slug } ) {
    description
    id
    name
    slug
  }
  allWpPost(limit: $limit, skip: $skip, sort: {fields: flotiqInternal___createdAt, order: DESC}, filter: {status: {eq: "publish"}, author: {elemMatch: {slug: {eq: $slug}}}}) {
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
}
`;
