import React, {Component} from 'react'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' //binds to react
import {compose} from 'redux'
import { Redirect } from 'react-router-dom'
import AllReceiptDetailsList from '../records/AllReceiptDetailsList';
import ImageUpload from '../records/ImageUpload';

class Dashboard extends Component {

  render() {
    const { receiptDetails, auth } = this.props
    
    if (!auth.uid) return < Redirect to= '/signin'/>
    return (
      <div className="receipt-component">
        <AllReceiptDetailsList receiptDetails={receiptDetails}/>
        <ImageUpload/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.firestore.ordered.records,
    auth: state.firebase.auth,
    receiptDetails: state.firestore.ordered.receiptDetails
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'receiptDetails', orderBy: ['date', 'desc']}
  ])
)(Dashboard)
