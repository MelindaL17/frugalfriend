import React, { Component } from 'react'
import {connect} from 'react-redux'
// import { firestoreConnect } from 'react-redux-firebase' //binds to react
// import {compose} from 'redux'
import { Redirect } from 'react-router-dom'
import { Icon } from "semantic-ui-react";

class Spending extends Component {
  render() {
    const { auth, select, receiptDetail, handleClear } = this.props
    console.log(this.props)
    if (!auth.uid) return < Redirect to= '/signin'/>
    if (receiptDetail) {
      return (
        <div className="spending-Component">
        {
          select.selectedReceipt ?
          <img className="image-receipt"src={receiptDetail.url}alt='http://via.placeholder.com/400x300' /> : null
        }
        
        <Icon name="delete" color="red" 
        onClick={handleClear} size="big"/>
        </div>
      )
    } else {
      return (
      <div className="spending-Component"></div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const ID = ownProps.select.selectedReceipt
  const receiptDetails = state.firestore.data.receiptDetails
  const receiptDetail = receiptDetails ? receiptDetails[ID] : null
  return {
    auth: state.firebase.auth,
    receiptDetail: receiptDetail
  }
}

export default
  connect(mapStateToProps)(Spending)
