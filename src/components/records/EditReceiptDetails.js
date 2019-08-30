import React, {Component} from 'react'
import {connect} from 'react-redux'
import Form from './Form'
import {editReceiptDetails}  from '../../store/actions/receiptActions'

class EditReceiptDetails extends Component {
  constructor(props) {
    super(props)
    console.log("EDIT!", props)
    this.state = {
      // date: '',
      where: '',
      totalAmount: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentDidMount () {
    this.setState({
      date: this.props.receiptDetail.date,
      where: this.props.receiptDetail.where,
      totalAmount: this.props.receiptDetail.totalAmount
    })
  }
  handleChange (evt) {
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
