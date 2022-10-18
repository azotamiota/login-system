import React from 'react'

class AuthorizedNavBar extends React.Component {
  render() {
    return (
    <>
     <div className='nav-container'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/login">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Sign Out</a>
            </li>
          </ul>
        </div>
      </nav>
      </div>
    </>
    )
  }
}

export default AuthorizedNavBar
