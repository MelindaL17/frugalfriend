import React from 'react'
import {Link} from 'react-router-dom'
import SignedInkLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'

const NavBar = (props) => {
  const { auth, profile } = props

  return (
    <nav>
      <div className="navbar">
        <Link className="logo" to= "/">
          Frugal Friend
          </Link>
          {auth.uid ?
            <SignedInkLinks profile={profile}/> : <SignedOutLinks/>}
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
