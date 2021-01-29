<a href="https://flotiq.com/">
    <img src="https://editor.flotiq.com/fonts/fq-logo.svg" alt="Flotiq logo" title="Flotiq" align="right" height="60" />
</a>

Gatsby Starter - WordPress-like Blog
========================

This is a [Gatsby](https://gatsbyjs.org) starter project for a blog. It's configured to pull blog posts data from [Flotiq](https://flotiq.com) and can be easily deployed to your cloud hosting - Heroku, Netlify, Gatsby Cloud, etc.

Live Demo: https://flotiq-gatsby-starter-wordpress-blog.netlify.app/

Screenshot

<img src="https://github.com/flotiq/gatsby-starter-wordpress-blog/raw/master/docs/flotiq-starter-blogposts.png" width=480 />


## Quick start

1. **Start the project from template using [Flotiq CLI]((https://github.com/flotiq/flotiq-cli))**

    ```bash
   npm install -g flotiq-cli
   flotiq start [flotiqApiKey] [projectName] https://github.com/flotiq/gatsby-starter-wordpress-blog
    ```
   * `flotiqApKey` - Read and write API key to your Flotiq account      
   * `projectName` - Your project name or project path

1. **Or you can also start the project from template using Gatsby CLI**
    
    ```bash
    gatsby new my-blog-starter https://github.com/flotiq/gatsby-starter-wordpress-blog
    ```
   
1. **Importing your WordPress blog to Flotiq**

   Create your [Flotiq.com](https://flotiq.com) account. Import your blog using [our WordPress importer](https://flotiq.com/services/migrate-wordpress-to-flotiq-headless-cms/)

1. **Configure application**

    The next step is to configure our application to know from where it has to fetch the data.
       
    You need to create a file called `.env` inside the root of the directory, with the following structure:

    ```
    GATSBY_FLOTIQ_API_KEY=YOUR FLOTIQ API KEY
    ```

1.  **Start developing**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd gatsby-starter-wordpress-blog/
    npm install
    gatsby develop
    ```

1.  **Open the source code and start editing!**
    
    Your site is now running at [http://localhost:8000](http://localhost:8000)!
    
    _Note: You'll also see a second link: _[http://localhost:8000/___graphql](http://localhost:8000/___graphql)`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._
    
    Open a project directory in your code editor of choice and edit `src/templates/index.js`. Save your changes and the browser will update in real time!

1. **Manage your posts using Flotiq editor**
      
    You can now easily manage your posts using [Flotiq editor](https://editor.flotiq.com)

## Deploy

  You can deploy this project to Heroku in 3 minutes:

  [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/flotiq/gatsby-starter-wordpress-blog)
  
  Or to Netlify:
  
  [![Deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/flotiq/gatsby-starter-wordpress-blog)


## Collaborating

   If you wish to talk with us about this project, feel free to hop on our [![Discord Chat](https://img.shields.io/discord/682699728454025410.svg)](https://discord.gg/FwXcHnX).
   
   If you found a bug, please report it in [issues](https://github.com/flotiq/gatsby-starter-wordpress-blog/issues).
