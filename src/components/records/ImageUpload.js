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

    return (
      <div className="image-upload-container">
        <input type="file" className="inputfile" id='image' onChange={this.handleChange}></input>
        <label htmlFor="image">
          {!this.state ? <span>Choose a file....</span> : this.state.image.name }
        </label>
          <button className="upload-button" onClick={this.handleUpload}>Upload</button>
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

