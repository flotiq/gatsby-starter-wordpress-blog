import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import Menu from "./menu"
import Categories from "./categories"
import LatestPosts from "./latest-posts"

class Layout extends React.Component {
  render() {
    const { title, children } = this.props
    let header = (
      <h1
        className="page-header"
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )

    return (
      <div>
        <div
          style={{
            paddingTop: `${rhythm(1.5)}`,
          }}
        >
          <header>{header}</header>
          <Menu />
        </div>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(46),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <main>
            <div className="row">
              <div className="col-sm-8 main-column">
                {children}
              </div>
              <div className="col-sm-4 side-column">
                <LatestPosts />
                <Categories />
              </div>
            </div>
          </main>
        </div>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          {` & `}
          <a href="https://flotiq.com">Flotiq</a>
        </footer>
      </div>
    )
  }
}

export default Layout
