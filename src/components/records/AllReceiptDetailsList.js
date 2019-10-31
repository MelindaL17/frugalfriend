import React, { Component } from 'react'
import ReceiptSummary from './ReceiptSummary'

class AllReceiptDetailsList extends Component {
  
  render () {
    const{receiptDetails} = this.props

    return (
      <div className="receipt-detail-table" >
        <table className="receipt-table" >
          <thead className="centered">
            <tr>
              <th>Date of Receipt</th>
              <th>Place</th>
              <th>Total Spent</th>
              <th>Edits</th>
            </tr>
          </thead>
            <tbody>
              { receiptDetails && receiptDetails.map(receiptDetail => {
                return (
                  <ReceiptSummary 
                  receiptDetail={receiptDetail}
                  key={receiptDetail.id} />
                  )
                })
              }
            </tbody>
        </table>
      </div>
    )
  }
}


export default (AllReceiptDetailsList)
