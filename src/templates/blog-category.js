import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import PostListItem from "../components/post-list-item"
import Pagination from "../components/pagination"

class BlogCategoryTemplate extends React.Component {
  render() {
    const category = this.props.data.wpCategory;
    const posts = this.props.data.allWpPost.edges;
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={category.name}
          description={category.description}
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
              {category.name}
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
          <section dangerouslySetInnerHTML={{ __html: category.description }} />
        </article>
        {posts.map(({ node }) => {
          return (
            <PostListItem node={node} key={node.id}/>
          )
        })}
        <Pagination totalCount={this.props.data.allWpPost.totalCount} limit={this.props.pageContext.limit} url={`/category/${category.slug}`} currentPage={this.props.pageContext.page} />
      </Layout>
    )
  }
}

export default BlogCategoryTemplate

export const pageQuery = graphql`
query BlogCategoryBySlug($slug: String!, $skip: Int!, $limit: Int!) {
  site {
    siteMetadata {
      title
    }
  }
  wpCategory( slug: { eq: $slug } ) {
    description
    id
    name
    slug
  }
  allWpPost(limit: $limit, skip: $skip, sort: {fields: flotiqInternal___createdAt, order: DESC}, filter: {status: {eq: "publish"}, categories: {elemMatch: {slug: {eq: $slug}}}}) {
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
