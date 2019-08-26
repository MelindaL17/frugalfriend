import React from 'react'
import {Link} from 'react-router-dom'
import SignedInkLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'

const NavBar = (props) => {
  const { auth, profile } = props
  
  const links = auth.uid ? <SignedInkLinks profile={profile}/> : <SignedOutLinks/>
  return (
    <nav className="navbar">
      <div className="container">
        <Link to= "/" className="brand-logo left">
          Frugal Friend
          </Link>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
export default connect(mapStateToProps) (NavBar)
