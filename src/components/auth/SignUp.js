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
      password: '',
      formErrors: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  }
  

  handleChange = event => {
    const { name, value } = event.target;
    const formErrors = { ...this.state.formErrors };
    
    switch (name) {
      case "firstName":
        formErrors.firstName = value.length < 1 ? "Name is required" : "";
        break;
      case "lastName":
        formErrors.lastName = value.length < 1 ? "Last name is required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "Invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({formErrors, [name]:value})
  }
  
  handleSubmit = event => {
    event.preventDefault()
    if(formValidation(this.state.formErrors)) {
      this.props.signUp(this.state)
    } else {
      console.error("FORM INVALID")
    }
  }

  
  render() {
    const { auth, authError } = this.props
    const { formErrors } = this.state
    if (auth.uid) return < Redirect to= '/'/>

    return (
      <div className="login-signin-container">
        <form onSubmit={this.handleSubmit}>
          <h5>Sign Up</h5>
          <label>First Name</label>
          
            <input className={formErrors.firstName.length > 0 ? "error" : null} type="text" placeholder="First Name" id="firstName" name="firstName" onChange={this.handleChange}/>
            {formErrors.firstName.length > 0 && (<span className="errorMessage" >{formErrors.firstName}</span>)}

            <label htmlFor="lastName">Last Name</label>
            <input className={formErrors.lastName.length > 0 ? "error" : null} type="text" placeholder="Last Name" id="lastName" name ="lastName" onChange={this.handleChange}/>
            {formErrors.lastName.length > 0 && (<span className="errorMessage">{formErrors.lastName}</span>)}
            <label htmlFor="email">Email</label>
            <input className={formErrors.email.length > 0 ? "error" : null} type="email" placeholder="Email" id="email" name="email" onChange={this.handleChange}/>
            {formErrors.email.length > 0 && (<span className="errorMessage">{formErrors.email}</span>)}

            <label htmlFor="password">Create Password</label>
            <input className={formErrors.password.length > 0 ? "error" : null} type="password" placeholder="Password" id="password" name="password" onChange={this.handleChange}/>
            {formErrors.password.length > 0 && (<span className="errorMessage">{formErrors.password}</span>)}

            <button className="login-signin-button">Sign Up</button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>

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


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValidation = formErrors => {
  let valid = true
  
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false)
  })
  return valid
}
