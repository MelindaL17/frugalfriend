import React, {Component} from 'react'
import { connect } from 'react-redux'
import { createRecord } from '../../store/actions/recordActions' 
import { Redirect } from 'react-router-dom'

class CreateRecord extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: ''
    }
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createRecord(this.state)
    this.props.history.push('/')
  }
  
  render() {
    const {auth} = this.props
    if (!auth.uid) return < Redirect to= '/signin'/>
    
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Record</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange}/>
          </div>
          
          <div className="input-field">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn cyan darken-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRecord: (record) => dispatch(createRecord(record))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(CreateRecord)
