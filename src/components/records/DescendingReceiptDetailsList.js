import React, { Component } from 'react'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {compose} from 'redux'
import { Icon } from "semantic-ui-react"
import ReceiptSummary from './ReceiptSummary'
import SimpleBarReact from "simplebar-react"
import "simplebar/src/simplebar.css"

class DescendingReceiptDetailsList extends Component { 

  render () {
    console.log(this.props)
    const{receiptDetails, handleDateSortToggle} = this.props
  
  return (
    <div className="receipt-detail-table-container" >
      <div className="grid-header">
        <div>
        <span className="cell">Date of Receipt</span>
        < Icon name="sort up" onClick={handleDateSortToggle}/>
        </div>
        <span className="cell">Place</span>
        <div>
        <span className="cell">Total Spent</span>
        </div>
        <span className="cell">Edits</span>
      </div>
      <SimpleBarReact style={{ maxHeight: 550 }}>
        
        { receiptDetails && receiptDetails.map(receiptDetail => {
          return (
            <ReceiptSummary receiptDetail={receiptDetail} key={receiptDetail.id}
            handleToggle={this.props.handleToggle}
            />
            )
          })
        }
        </SimpleBarReact>
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
      orderBy: ['date', 'desc'],
      where: [ 'authorId','==', !props.auth.uid ? null: props.auth.uid]
    }
  ])
)(DescendingReceiptDetailsList)
