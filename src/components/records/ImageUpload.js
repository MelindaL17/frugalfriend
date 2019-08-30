import React, { Component } from 'react'
import { connect } from 'react-redux'
import {uploadReceipt} from '../../store/actions/receiptActions'

class Uploader extends Component {
  
  handleChange = (event) => {
    console.log(event.target.value, 'TARGET')
    this.setState({
      [event.target.id]: event.target.files[0]
    })
  }
  handleUpload = async event => {
    event.preventDefault()
    this.props.uploadReceipt(this.state)
  }
  
  render () {
    // console.log(this.state.image ? this.state.image.name : null)
    return (
      // <div className="image-upload">
      //   <input type="file" className="custom-file-input" id='image' onChange={this.handleChange}></input>
      //   <button className="upload-button" onClick={this.handleUpload}>Upload</button>
      // </div>
      <div>
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

