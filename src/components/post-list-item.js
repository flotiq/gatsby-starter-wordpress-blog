import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import React from "react"

const PostListItem = ({ node, latest }) => {
  const title = node.title || node.slug
  let tags = '';
  let categories = '';
  if(node.categories.length && !latest) {
    categories = (<span className="category-link-container">
            {node.categories.map((category) => {
              return (
                <Link to={`/category/${category.slug}`} key={category.id} className="category-link">{category.name}</Link>
              )
            })}
          </span>)
  }
  if(node.tags.length && !latest) {
    tags = (<span className="category-link-container">
            {node.tags.map((tag) => {
              return (
                <Link to={`/tag/${tag.slug}`} key={tag.id} className="category-link">{tag.name}</Link>
              )
            })}
          </span>)
  }
  return (
    <article key={node.slug} className="row post-list-item">
      <div className="col-sm-6 post-list-image">
        <Link style={{ boxShadow: `none` }} to={`/post/${node.slug}`}>
          { node.featuredMedia && node.featuredMedia[0] &&
          <img src={`https://api.flotiq.com/image/460x0/${node.featuredMedia[0].id}.${node.featuredMedia[0].extension}`} alt="test" style={{maxWidth: '100%', height: 'auto'}}/>
          }
        </Link>
      </div>
      <div className="col-sm-6 post-list-content">
        <header>
          {categories}
          {tags}
          <h3
            className="post-list-name"
            style={{
              marginTop: rhythm(1 / 2),
              marginBottom: rhythm(1 / 2),
            }}
          >
            <Link style={{ boxShadow: `none` }} to={`/post/${node.slug}`}>
              {title}
            </Link>
          </h3>
          <small className="post-list-date">{(new Date(node.created ?? node.flotiqInternal.createdAt)).toDateString()}</small>
        </header>
        {!latest && <section>
          <p
            dangerouslySetInnerHTML={{
              __html: node.description || node.excerpt,
            }}
          />
        </section>}
      </div>
    </article>
  )
}

export default PostListItem;
