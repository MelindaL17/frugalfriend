import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import EditReceiptDetails from './EditReceiptDetails';

class SingleReceiptDetail extends Component {

  render() {
    const {receiptDetail, auth} = this.props
    const receiptDetailId = this.props.match.params.id
    
    if (!auth.uid) return < Redirect to= '/signin'/>
    if (receiptDetail) {
      return (
      <div className="container-section-project-details">
      <div className="receipt-detail-card">
        <p>Date of Receipt: {moment(receiptDetail.date, moment.ISO_8601).format('L')}</p>
        <p>Place: {receiptDetail.where}</p>
        <p>Total Spent: ${receiptDetail.totalAmount}</p>
        < img className="image-receipt"src={receiptDetail.url} alt='http://via.placeholder.com/400x300' />
      </div>
      <EditReceiptDetails receiptDetailId={receiptDetailId}
      receiptDetail={receiptDetail}/>
    </div>
      )
    } else {
      return(
        <div className="container center">
          <p>Loading Receipt...</p>
        </div>
      )
    }
  }
}


const mapStateToProps = (state, ownProps) => {
  
  const id = ownProps.match.params.id
  const receiptDetails = state.firestore.data.receiptDetails
  const receiptDetail = receiptDetails ? receiptDetails[id] : null
  return {
    receiptDetail: receiptDetail,
    auth: state.firebase.auth
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'receiptDetails'}
  ])
) (SingleReceiptDetail);
