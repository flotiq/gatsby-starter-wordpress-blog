import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";
import trim from "../utils/trim";

class BlogPostTemplate extends React.Component {
  render() {

    const post = this.props.data.wpPost;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;
    let tags = '';
    let categories = '';
    if(post.categories.length) {
      categories = (<span className="category-link-container">
        {post.categories.map((category) => {
          return (
            <Link to={`/category/${category.slug}`} key={category.id} className="category-link">{category.name}</Link>
          )
        })}
      </span>)
    }
    if(post.tags.length) {
      tags = (<span className="category-link-container">
        {post.tags.map((tag) => {
          return (
            <Link to={`/tag/${tag.slug}`} key={tag.id} className="category-link">{tag.name}</Link>
          )
        })}
      </span>)
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.title}
          description={post.content || post.excerpt}
        />
        <article>
          <header>
            <div className="post-categories-container">{categories}{tags}</div>
            <h2
              className="post-name"
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.title}
            </h2>
            <p
              className="post-info"
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
                marginTop: rhythm(1 / 2),
              }}
            >
              <span>Written by: <Link to={`/author/${post.author[0].slug}`} className="post-author-link">{post.author[0].name}</Link></span> | <span>{(new Date(post.created ?? post.flotiqInternal.createdAt)).toDateString()}</span>
            </p>
          </header>
          { post.featuredMedia && post.featuredMedia[0] &&
          <img src={`https://api.flotiq.com/image/1920x0/${post.featuredMedia[0].id}.${post.featuredMedia[0].extension}`} alt="test" style={{maxWidth: '100%', height: 'auto'}}/>
	        }
          <section dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <nav className="bottom-nav">
          <ul>
            <li>
              {previous && (
                <div className="previous-post">
                  <div className="previous-post-info">previous post</div>
                  <Link to={'/post/' + previous.slug} rel="prev">
                    ← {trim(previous.title)}
                  </Link>
                </div>
              )}
            </li>
            <li>
              {next && (
                <div className="next-post">
                  <div className="next-post-info">next post</div>
                  <Link to={'/post/' + next.slug} rel="next">
                    {trim(next.title)} →
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
  site {
    siteMetadata {
      title
    }
  }
  wpPost(slug: {eq: $slug}, status: {eq: "publish"}) {
    slug
    title
    tags {
      slug
      name
      id
    }
    type
    status
    created
    excerpt
    content
    categories {
      slug
      name
      id
    }
    author {
      slug
      name
    }
    featuredMedia {
      extension
      id
    }
    flotiqInternal {
      createdAt
    }
    created
    id
  }
}
`;
