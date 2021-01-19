const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
  query getData {
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
          }
          modified
          excerpt
          slug
          title
          tags {
            slug
            name
          }
          content
          status
        }
      }
    }
    allWpPage(filter: {status: {eq: "publish"}}) {
      edges {
        node {
          title
          content
          author {
            name
            slug
          }
          status
          slug
          modified
          featuredMedia {
            extension
            id
          }
          parentPage {
            slug
            title
          }
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
    allWpTag {
      edges {
        node {
          description
          id
          name
          slug
        }
      }
    }
    allWpAuthor {
      edges {
        node {
          name
          id
          slug
          description
        }
      }
    }
  }
`);

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const posts = result.data.allWpPost.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: 'post/' + post.node.slug,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
  })

  // Create blog pages.
  const blogPage = path.resolve(`./src/templates/blog-page.js`);
  const pages = result.data.allWpPage.edges;

  pages.forEach((page, index) => {
    const previous = index === pages.length - 1 ? null : pages[index + 1].node;
    const next = index === 0 ? null : pages[index - 1].node;

    createPage({
      path: page.node.slug,
      component: blogPage,
      context: {
        slug: page.node.slug,
        previous,
        next,
      },
    })
  })

  // Create blog pages.
  const tagPage = path.resolve(`./src/templates/blog-tag.js`);
  const tags = result.data.allWpTag.edges;

  tags.forEach((tag, index) => {
    const previous = index === tags.length - 1 ? null : tags[index + 1].node;
    const next = index === 0 ? null : tags[index - 1].node;

    createPage({
      path: 'tag/' + tag.node.slug,
      component: tagPage,
      context: {
        slug: tag.node.slug,
        previous,
        next,
      },
    })
  })

  // Create blog pages.
  const categoryPage = path.resolve(`./src/templates/blog-category.js`);
  const categories = result.data.allWpCategory.edges;

  categories.forEach((category, index) => {
    const previous = index === categories.length - 1 ? null : categories[index + 1].node;
    const next = index === 0 ? null : categories[index - 1].node;

    createPage({
      path: 'category/' + category.node.slug,
      component: categoryPage,
      context: {
        slug: category.node.slug,
        previous,
        next,
      },
    })
  })

  // Create blog pages.
  const authorPage = path.resolve(`./src/templates/blog-author.js`);
  const authors = result.data.allWpAuthor.edges;

  authors.forEach((author, index) => {
    const previous = index === authors.length - 1 ? null : authors[index + 1].node;
    const next = index === 0 ? null : authors[index - 1].node;

    createPage({
      path: 'author/' + author.node.slug,
      component: authorPage,
      context: {
        slug: author.node.slug,
        previous,
        next,
      },
    })
  })
}
