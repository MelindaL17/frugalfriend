import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadReceipt } from "../../store/actions/receiptActions";

const initialState = {
  imageSelected:false,
  errorMessage: ""
}
class Uploader extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.files[0],
      imageSelected: true,
      errorMessage: ""
    })
  };
  
  handleUpload = async event => {
    event.preventDefault();
    if(this.state.image) {
      await this.props.uploadReceipt(this.state)
      if(this.props.receipt.status.length > 0) {
        this.setState({errorMessage: "Unable to Upload Receipt"})
      } else {
        this.setState({ 
          imageSelected: false,
          errorMessage: ''
        })
      }
    } else {
      this.setState({
        errorMessage: "No receipt selected"
      })
    }
    this.setState({
      initialState
    })
  };

  render() {
    return (
      <div className="image-upload-container">
        <input
          type="file"
          className="inputfile"
          id="image"
          onChange={this.handleChange}
        ></input>
        <label htmlFor="image">
          {!this.state.image ? (
            <span>Choose a file....</span>
          ) : (
            this.state.image.name
          )}
        </label>
        <button className="upload-button" onClick={this.handleUpload}>
          Upload
        </button>
        <div>
        {this.state.errorMessage ? <span className="errorMessage">{this.state.errorMessage}</span> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    receipt: state.receiptReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadReceipt: receipt => dispatch(uploadReceipt(receipt))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader);
