import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const Categories = () => {
  const data = useStaticQuery(graphql`
    query CategoriesQuery {
      allWpPost(sort: {fields: flotiqInternal___createdAt, order: DESC}, filter: {status: {eq: "publish"}}) {
        edges {
          node {
            categories {
              name
              slug
            }
          }
        }
      }
      allWpCategory(sort: {fields: slug, order: ASC}) {
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
  const categories = data.allWpCategory.edges
  const categoriesCount = {}
  posts.forEach(({ node }) => {
    node.categories.forEach(category => {
      if (typeof categoriesCount[category.slug] === "undefined") {
        categoriesCount[category.slug] = 0
      }
      categoriesCount[category.slug]++
    })
  })
  return (
    <section>
      <div className="categories-header">
        CATEGORIES
      </div>
      {categories.map(({ node }) => {
        return (
          <div className="categories-list" key={node.id}>
            <Link to={`/category/${node.slug}`} className="category-link">{node.name}</Link>
            <span className="category-count">({categoriesCount[node.slug] ?? 0})</span>
          </div>
        )
      })}
    </section>
  )
};

export default Categories
