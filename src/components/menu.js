import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

import { rhythm } from "../utils/typography"

const Menu = () => {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      allWpPage(filter: {status: {eq: "publish"}}) {
        edges {
          node {
            id
            title
            slug
            parentPage {
              slug
              title
            }
          }
        }
      }
    }
  `);

  const pages = data.allWpPage.edges;
  return (
    <div
      className="menu"
    >
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(46),
          display: `flex`,
          padding: `0 ${rhythm(3 / 4)}`,
        }}
        >
        <div className="menu-item">
          <Link style={{ boxShadow: `none` }} to={`/`}>
            HOME
          </Link>
        </div>
        {pages.map(({ node }) => {
          if(node.parentPage === null) {
            return (
              <div className="menu-item" key={node.id}>
                <Link style={{ boxShadow: `none` }} to={`/${node.slug}`}>
                  {node.title}
                </Link>
              </div>
            )
          }
          return '';
          })
        }
      </div>

    </div>
  )
};

export default Menu
