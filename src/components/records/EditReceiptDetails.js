import React, {Component} from 'react'
import {connect} from 'react-redux'
import Form from './Form'
import {editReceiptDetails}  from '../../store/actions/receiptActions'
import moment from 'moment'
class EditReceiptDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      where: '',
      totalAmount: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentDidMount () {
    this.setState({
      date:moment(this.props.receiptDetail.date, moment.ISO_8601).format('L'),
      where: this.props.receiptDetail.where,
      totalAmount: this.props.receiptDetail.totalAmount
    })
  }
  handleChange (evt) {
    console.log(evt.target.value)
      this.setState({
        [evt.target.name]: evt.target.value
      })
  }
  
  handleSubmit (evt) {
    const {receiptDetailId} = this.props
    evt.preventDefault()
    this.props.updateReceipt(receiptDetailId, this.state)
  }
  render(){
    return(
      <Form 
    {...this.state}
    handleChange={this.handleChange}
    handleSubmit={this.handleSubmit}/>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    updateReceipt: (receiptId, updatedReceipt) => dispatch(editReceiptDetails(receiptId, updatedReceipt))
  }
}

export default connect(null, mapDispatchToProps)(EditReceiptDetails)
