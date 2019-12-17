import React, { Component } from 'react'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {compose} from 'redux'
import { Icon } from "semantic-ui-react";
import ReceiptSummary from './ReceiptSummary'

class AscendingReceiptDetailsList extends Component { 

  render () {
    const{receiptDetails, handleSortToggle} = this.props
  return (
    <div className="receipt-detail-table-container" >
      <div className="grid-header">
        <div>
        <span className="cell">Date of Receipt</span>
        < Icon name="sort down" onClick={handleSortToggle}/>
        </div>
        <span className="cell">Place</span>
        <span className="cell">Total Spent</span>
        <span className="cell">Edits</span>
      </div>
        { receiptDetails && receiptDetails.map(receiptDetail => {
          return (
          <ReceiptSummary receiptDetail={receiptDetail} key={receiptDetail.id}
          handleToggle={this.props.handleToggle}
          />
            )
          })
        }
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    receiptDetails: state.firestore.ordered.receiptDetails
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: 'receiptDetails',
      orderBy: ['date'],
      where: [ 'authorId','==', !props.auth.uid ? null: props.auth.uid]
    }
  ])
)(AscendingReceiptDetailsList)
