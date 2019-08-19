import React, {Component} from 'react'
import { connect } from 'react-redux';
import {signIn} from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'


class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.signIn(this.state)
  }
  
  render() {
    const {authError, auth} = this.props
    
    if (auth.uid) return < Redirect to= '/'/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn cyan darken-1 z-depth-0">Login</button>
            <div className='red-text center' >
              {authError ? <p>{authError}</p> : null}
              
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.authReducer.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (SignIn)
