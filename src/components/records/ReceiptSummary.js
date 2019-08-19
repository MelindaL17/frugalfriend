import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteReceiptDetails} from '../../store/actions/receiptActions'


class ReceiptSummary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }
  handleChange = (event) => {
    event.preventDefault()
    this.props.deleteReceipt(event.target.value)
  }
  
  render () {
    const {receiptDetail} = this.props

    
    return (
      <tr>
        <td>{moment(receiptDetail.date, moment.ISO_8601).calendar()}</td>
        <td>{receiptDetail.where}</td>
        <td>${receiptDetail.totalAmount}</td>
        <td>
          <Link to={`/receiptDetail/${receiptDetail.id}`}>
          <button className="waves-effect waves-light btn-small" 
          value={receiptDetail.id}
          onClick={this.handleEdit}>Edit
          </button>
          </Link>
          <button className="waves-effect waves-light btn-small"
          value={receiptDetail.id} onClick={this.handleChange}>Delete</button>
        </td>
      </tr>
      )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    deleteReceipt: (receiptDetailId) => dispatch(deleteReceiptDetails(receiptDetailId))
  }
}

export default connect(null, mapDispatchToProps)(ReceiptSummary)

