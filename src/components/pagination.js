import React from "react"
import Link from "gatsby-link"

const pagination = ({ totalCount, limit, url, currentPage }) => {
  const pages = Math.ceil(totalCount / limit)
  console.log(limit, totalCount, currentPage)
  const isActive = ({ href }) => {
    return href === `${url}/${currentPage}` ? { className: "active" } : (href === `${url}` && currentPage === 1 ? { className: "active" } : {})
  }
  const isFirst = currentPage === 1
  const isLast = currentPage === pages
  const prevPage = currentPage - 1 === 1 ? url : `${url}/${(currentPage - 1).toString()}`
  const nextPage = `${url}/${(currentPage + 1).toString()}`
  return (limit < totalCount) && (<div className="pagination">
    {!isFirst && (
      <Link to={prevPage} rel="prev">
        <div className="pagination-element">
          {String.fromCharCode(171)}
        </div>
      </Link>
    )}
    {pages < 10 && [...Array(pages).keys()].map(index => (
      <Link key={index} to={`${url}/${index + 1}`} getProps={isActive}>
        <div className="pagination-element">{index + 1}
        </div>
      </Link>
    ))}
    {pages > 10 && (
      <>
        <Link to={`${url}/1`} getProps={isActive}>
          <div className="pagination-element">1
          </div>
        </Link>

        {currentPage <= 3 && (
          <Link to={`${url}/2`} getProps={isActive}>
            <div className="pagination-element">2
            </div>
          </Link>
        )}
        {currentPage <= 3 && (
          <>
            <Link to={`${url}/3`} getProps={isActive}>
              <div className="pagination-element">3
              </div>
            </Link>
          </>
        )}
        {currentPage < 4 && (
          <>
            <Link to={`${url}/4`} getProps={isActive}>
              <div className="pagination-element">4
              </div>
            </Link>
          </>
        )}

        <Link>
          <div className="pagination-element">...
          </div>
        </Link>

        {currentPage > 3 && currentPage < pages - 2 && (
          <>
            <Link to={`${url}/${currentPage - 1}`} getProps={isActive}>
              <div className="pagination-element">{currentPage - 1}
              </div>
            </Link>
            <Link to={`${url}/${currentPage}`} getProps={isActive}>
              <div className="pagination-element">{currentPage}
              </div>
            </Link>
            <Link to={`${url}/${currentPage + 1}`} getProps={isActive}>
              <div className="pagination-element">{currentPage + 1}
              </div>
            </Link>
            <Link>
              <div className="pagination-element">...
              </div>
            </Link>
          </>
        )}
        {currentPage > pages - 3 && (
          <>
            <Link to={`${url}/${pages - 3}`} getProps={isActive}>
              <div className="pagination-element">{pages - 3}
              </div>
            </Link>
          </>
        )}
        {currentPage > pages - 3 && (
          <>
            <Link to={`${url}/${pages - 2}`} getProps={isActive}>
              <div className="pagination-element">{pages - 2}
              </div>
            </Link>
          </>
        )}
        {currentPage > pages - 3 && (
          <Link to={`${url}/${pages - 1}`} getProps={isActive}>
            <div className="pagination-element">{pages - 1}
            </div>
          </Link>
        )}

        <Link to={`${url}/${pages}`} getProps={isActive}>
          <div className="pagination-element">{pages}
          </div>
        </Link>

      </>)}
    {!isLast && (
      <Link to={nextPage} rel="next">
        <div className="pagination-element">
          {String.fromCharCode(187)}
        </div>
      </Link>
    )}
  </div>)
}

export default pagination
