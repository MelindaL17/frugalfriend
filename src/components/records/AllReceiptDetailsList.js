import React, { Component } from 'react'
import ReceiptSummary from './ReceiptSummary'

class AllReceiptDetailsList extends Component {
  
  render () {
    const{receiptDetails} = this.props
  
  return (
    <div className="receipt-detail-table-container" >
      <div className="grid-header">
        <div>
        <span className="cell">Date of Receipt</span>
          
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


export default (AllReceiptDetailsList)
