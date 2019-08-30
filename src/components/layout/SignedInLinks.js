/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { SignOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <ul className="navbar-Links">
      <li><NavLink to='/' onClick={props.signOut}>Log Out</NavLink> </li>
      <li><NavLink to='/' className='btn btn-floating cyan lighten-2'> {props.profile.initials}</NavLink> </li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(SignOut())
  }
}

export default connect(null, mapDispatchToProps) (SignedInLinks)
