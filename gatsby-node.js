const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
  query getData {
    site {
      siteMetadata {
        postsLimit
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
      totalCount
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

  const limit = result.data.site.siteMetadata.postsLimit;

  // Create blog pages.
  const postsPage = path.resolve(`./src/templates/blog-list.js`);
  const postsAll = result.data.allWpPost;
  const _pages = Math.ceil(postsAll.totalCount/limit);
  if(_pages > 0) {
    for (let page = 1; page <= _pages; page++) {
      createPage({
        path: 'posts/' + page,
        component: postsPage,
        context: {
          skip: (page - 1) * limit,
          page,
          limit,
        },
      })
    }
  }

  // Create blog pages.
  const tagPage = path.resolve(`./src/templates/blog-tag.js`);
  const tags = result.data.allWpTag.edges;

  await Promise.all(tags.map(async (tag, index) => {
    const previous = index === tags.length - 1 ? null : tags[index + 1].node;
    const next = index === 0 ? null : tags[index - 1].node;
    const posts = await graphql(`
    query getTagPosts {
    allWpPost(filter: {status: {eq: "publish"}, tags: {elemMatch: {slug: {eq: "${tag.node.slug}"}}}}) {
      totalCount
    }}`);
    const pages = Math.ceil(posts.data.allWpPost.totalCount/limit);

    createPage({
      path: 'tag/' + tag.node.slug,
      component: tagPage,
      context: {
        slug: tag.node.slug,
        skip: 0,
        limit,
        page: 1,
        previous,
        next,
      },
    });
    if(pages > 0) {
      for (let page = 1; page <= pages; page++) {
        createPage({
          path: 'tag/' + tag.node.slug + '/' + page,
          component: tagPage,
          context: {
            slug: tag.node.slug,
            skip: (page - 1) * limit,
            limit,
            page,
            previous,
            next,
          },
        })
      }
    }
  }));

  // Create blog pages.
  const categoryPage = path.resolve(`./src/templates/blog-category.js`);
  const categories = result.data.allWpCategory.edges;

  await Promise.all(categories.map(async (category, index) => {
    const previous = index === categories.length - 1 ? null : categories[index + 1].node;
    const next = index === 0 ? null : categories[index - 1].node;
    const posts = await graphql(`
    query getCategoryPosts {
    allWpPost(filter: {status: {eq: "publish"}, categories: {elemMatch: {slug: {eq: "${category.node.slug}"}}}}) {
      totalCount
    }}`);
    const pages = Math.ceil(posts.data.allWpPost.totalCount/limit);

    createPage({
      path: 'category/' + category.node.slug,
      component: categoryPage,
      context: {
        slug: category.node.slug,
        skip: 0,
        limit,
        page: 1,
        previous,
        next,
      },
    });
    if(pages > 0) {
      for (let page = 1; page <= pages; page++) {
        createPage({
          path: 'category/' + category.node.slug + '/' + page,
          component: categoryPage,
          context: {
            slug: category.node.slug,
            skip: (page - 1) * limit,
            limit,
            page,
            previous,
            next,
          },
        })
      }
    }
  }));

  // Create blog pages.
  const authorPage = path.resolve(`./src/templates/blog-author.js`);
  const authors = result.data.allWpAuthor.edges;

  await Promise.all(authors.map(async (author, index) => {
    const previous = index === authors.length - 1 ? null : authors[index + 1].node;
    const next = index === 0 ? null : authors[index - 1].node;
    const posts = await graphql(`
    query getCategoryPosts {
    allWpPost(filter: {status: {eq: "publish"}, author: {elemMatch: {slug: {eq: "${author.node.slug}"}}}}) {
      totalCount
    }}`);
    const pages = Math.ceil(posts.data.allWpPost.totalCount/limit);

    createPage({
      path: 'author/' + author.node.slug,
      component: authorPage,
      context: {
        slug: author.node.slug,
        skip: 0,
        limit,
        page: 1,
        previous,
        next,
      },
    });
    if(pages > 0) {
      for (let page = 1; page <= pages; page++) {
        createPage({
          path: 'author/' + author.node.slug + '/' + page,
          component: authorPage,
          context: {
            slug: author.node.slug,
            skip: (page - 1) * limit,
            limit,
            page,
            previous,
            next,
          },
        })
      }
    }
  }))
}
