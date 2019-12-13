import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Icon } from "semantic-ui-react"
import PinchToZoom from 'react-pinch-and-zoom'

class Spending extends Component {
  
  render() {
    const { auth, select, receiptDetail, handleClear } = this.props
    // console.log('RECEIPT DETAIL',this.props.receiptDetail)
    if (!auth.uid) return < Redirect to= '/signin'/>
    if (receiptDetail) {
      return (
        <div className="spending-Component">
        {
          select.selectedReceipt ?
          <div className="image-preview">
            <PinchToZoom>
              <img className="image-receipt"src={receiptDetail.url}alt='http://via.placeholder.com/400x300' />
            </PinchToZoom>
              <Icon name="delete" inverted color='black' onClick={handleClear} size="large"/>
          </div> : null
        }
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
