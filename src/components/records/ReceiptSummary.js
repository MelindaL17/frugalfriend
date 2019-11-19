import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteReceiptDetails} from '../../store/actions/receiptActions'
import {Icon} from 'semantic-ui-react'

class ReceiptSummary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggleEditing: false
    }
  }
  handleChange = (event, data) => {
    event.preventDefault()
    this.props.deleteReceipt(data.value)
  }
  
  render () {
    const {receiptDetail} = this.props
    
    return (
      <div className="receipt-row">
        <span className="cell">{moment(receiptDetail.date, moment.ISO_8601).format('L')}</span>
        <span className="cell">{receiptDetail.where}</span>
        <span className="cell">${receiptDetail.totalAmount}</span>
        <span className="cell">
          <Link to={`/receiptDetail/${receiptDetail.id}`}>
            <Icon name="edit outline" color="blue" size="large"/>
          </Link>
          <Icon name="delete" color="red" value={receiptDetail.id} link onClick={this.handleChange} size="large"/>
        </span>
        
      </div>
      )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    deleteReceipt: (receiptDetailId) => dispatch(deleteReceiptDetails(receiptDetailId))
  }
}

export default connect(null, mapDispatchToProps)(ReceiptSummary)

