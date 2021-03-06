import React, {Component} from 'react'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router-dom'
import DescendingReceiptDetailsList from '../records/DescendingReceiptDetailsList'
import AscendingReceiptDetailsList from '../records/AscendingReceiptDetailsList'
import ImageUpload from '../records/ImageUpload';
import Spending from './Spending';

class Dashboard extends Component {
  constructor (props) {
    super(props)
      this.state = {
        userId: this.props.auth.uid,
        selectedReceipt: '',
        sortByDescending: true
      }
      this.handleToggle = this.handleToggle.bind(this)
    }
    
  handleToggle = (event, data) => {
    if(this.state.selectedReceipt === data.value) {
      this.setState({
        selectedReceipt: ''
      })
    } else {
      this.setState({
        selectedReceipt: data.value
      })
    }
  }
  
  handleClear = () => {
    this.setState({
      selectedReceipt: ''
    })
  }
  
  handleSortToggle = () => {
    this.setState({
      sortByDescending: !this.state.sortByDescending
    })
  }
  
  
  render() {
    const { receiptDetails, auth } = this.props
    if (!auth.uid) return < Redirect to= '/signin'/>

    return (
      <div className="main-container" >
        <div className="dashboard-component">
          {
            this.state.sortByDescending ?
          <DescendingReceiptDetailsList
          receiptDetails={receiptDetails}
          handleToggle={this.handleToggle}
          handleSortToggle={this.handleSortToggle}/> :
          <AscendingReceiptDetailsList
          receiptDetails={receiptDetails}
          handleToggle={this.handleToggle}
          handleSortToggle={this.handleSortToggle}/>
        }
          <ImageUpload/>
        </div>
          <Spending receiptDetails={receiptDetails} select={this.state} handleClear={this.handleClear}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    receiptDetails: state.firestore.ordered.receiptDetails
  }
}


export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: 'receiptDetails',
      where: [ 'authorId','==', !props.auth.uid ? null: props.auth.uid]
    }
  ])
)(Dashboard)
