import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isInvalid: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isInvalid: true, errorMsg})
  }

  onSubmitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {username, password, isInvalid, errorMsg} = this.state

    return (
      <form className="login-bg-container" onSubmit={this.onSubmitDetails}>
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-website-logo-img"
            alt="website logo"
          />
          <div className="login-text-container">
            <div className="label-container">
              <label htmlFor="username" className="label-heading">
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                id="username"
                placeholder="Username"
                className="input-text"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="label-container">
              <label htmlFor="password" className="label-heading">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                id="password"
                placeholder="Password"
                className="input-text"
                onChange={this.onChangePassword}
              />
            </div>
            <button className="login-button">Login</button>
            {isInvalid && <p className="error-text">{errorMsg}</p>}
          </div>
        </div>
      </form>
    )
  }
}

export default LoginForm
