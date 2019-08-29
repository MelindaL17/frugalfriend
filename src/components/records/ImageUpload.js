import React, { Component } from 'react'
import { connect } from 'react-redux'
import {uploadReceipt} from '../../store/actions/receiptActions'


class Uploader extends Component {
  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.files[0]
    })
  }
  handleUpload = async event => {
    event.preventDefault()
    this.props.uploadReceipt(this.state)
  }
  render () {
    // const style = {
    //   height: '50vh',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center'
    // }
    return (
      <div className="image-upload">
        <input type="file" id='image' onChange={this.handleChange}></input>
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    receipt: state.receiptReducer.allReceipts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadReceipt: (receipt) => dispatch(uploadReceipt(receipt))
  }
}
export default 
  connect(mapStateToProps, mapDispatchToProps)(Uploader)

