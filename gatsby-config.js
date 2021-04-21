require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter WordPress-like Blog`,
    author: `Flotiq developers`,
    description: `A starter blog demonstrating what Flotiq & Gatsby can do together when moving from WordPress.`,
    siteUrl: `https://flotiq-gatsby-starter-wordpress-blog.netlify.app/`,
    postsLimit: 5,
  },
  plugins: [
    {
      "resolve": "gatsby-source-flotiq",
      "options": {
          "authToken": process.env.GATSBY_FLOTIQ_API_KEY,
          "forceReload": false,
          "includeTypes": ['wp_author','wp_tag','wp_category','wp_post','wp_page','_media']
      }
  },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
