import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {signUp } from '../../store/actions/authActions'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
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
    this.props.signUp(this.state)
  }
  
  render() {
    const { auth, authError } = this.props
    if (auth.uid) return < Redirect to= '/'/>
    
    return (
      <div className="login-signin-container">
        <form onSubmit={this.handleSubmit}>
          <h5>Sign Up</h5>

            <label htmlFor="firstName">First Name</label>
            <input className="login-signin-input" type="text" id="firstName" onChange={this.handleChange}/>
          {/* </div> */}
          {/* <div className="input-field"> */}
            <label htmlFor="lastName">Last Name</label>
            <input className="login-signin-input" type="text" id="lastName" onChange={this.handleChange}/>
          {/* </div> */}
          
          {/* <div className="input-field"> */}
            <label htmlFor="email">Email</label>
            <input className="login-signin-input" type="email" id="email" onChange={this.handleChange}/>
          {/* </div> */}
          
          {/* <div className="input-field"> */}
            <label htmlFor="password">Create Password</label>
            <input className="login-signin-input" type="password" id="password" onChange={this.handleChange}/>
          {/* </div> */}
          {/* <div className="input-field"> */}
            <button className="login-signin-button">Sign Up</button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          {/* </div> */}
        </form>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.authReducer.authError
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SignUp)
