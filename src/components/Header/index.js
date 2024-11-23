import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="job-nav-container">
      <div className="lg-view-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo-img"
            alt="website logo"
          />
        </Link>
        <ul className="links-container">
          <Link to="/">
            <li className="list-link-text">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="list-link-text">Jobs</li>
          </Link>
        </ul>
        <button className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="sm-view-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo-sm-img"
            alt="website logo"
          />
        </Link>
        <ul className="icons-container">
          <Link to="/">
            <li className="list-item">
              <AiFillHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li className="list-item">
              <BsBriefcaseFill className="icon" />
            </li>
          </Link>
          <li className="list-item">
            <FiLogOut className="icon" />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
