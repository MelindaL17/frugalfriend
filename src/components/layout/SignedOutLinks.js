import React from 'react'
import {NavLink} from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <ul className="navbar-Links">
      <li><NavLink to='/signUp'>Signup</NavLink> </li>
      <li><NavLink to='/signIn'> Login</NavLink> </li>
    </ul>
  )
}

export default SignedOutLinks
