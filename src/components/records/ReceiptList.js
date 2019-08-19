import React, {Component} from 'react'
import { connect } from 'react-redux';
import {scanReceipt} from '../../store/actions/receiptActions'
//not used anymore
class ReceiptList extends Component {
  
  handleClick = (event) => {
    this.props.scanReceipt(event.target.value)
  }
  render() {
   const {receipts} = this.props
    return (
      <div className="project-list section">
        { receipts && receipts.map(image => {
          return (
            <div className="materialboxed" width="150" key={image.id}>
              <img className="image-receipt" src={ image.url} alt='http://via.placeholder.com/400x300' />
              <button name='url' value={image.url} 
              onClick={this.handleClick}> Record </button>
            </div>
            )
        })}
      </div>
    )
  }
}

//store result in database

const mapDispatchToProps = (dispatch) => {
  return {
    scanReceipt: (imageUrl) => dispatch(scanReceipt(imageUrl))
  }
}
export default connect(null, mapDispatchToProps)(ReceiptList)
