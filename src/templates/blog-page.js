import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";

class BlogPageTemplate extends React.Component {
  render() {

    const post = this.props.data.wpPage;
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.title}
          description={post.content || post.excerpt}
        />
        <article>
          <header>
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
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >

            </p>
          </header>
          { post.featuredMedia && post.featuredMedia[0] &&
          <img src={`https://api.flotiq.com/image/1920x0/${post.featuredMedia[0].id}.${post.featuredMedia[0].extension}`} alt="test" style={{maxWidth: '100%', height: 'auto'}}/>
          }
          <section dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </Layout>
    )
  }
}

export default BlogPageTemplate

export const pageQuery = graphql`
query BlogPageBySlug($slug: String!) {
  site {
    siteMetadata {
      title
    }
  }
  wpPage( slug: { eq: $slug } ) {
    id
    title
    content
    featuredMedia {
      extension
      id
    }
  }
}
`;
