import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="login-signin-container">
        <div className="sign-up-wrapper">
          <form onSubmit={this.handleSubmit}>
            <h1>Sign In</h1>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className="login-signin-input"
                placeholder="Email"
                type="email"
                id="email"
                onChange={this.handleChange}
              />
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className="login-signin-input"
                placeholder="Password"
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>
            <button className="login-signin-button">Login</button>
            {authError ? (
              <span className="errorMessage">{authError}</span>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.authReducer.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
