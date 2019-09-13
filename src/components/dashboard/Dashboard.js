import React, {Component} from 'react'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect } from 'react-router-dom'
import AllReceiptDetailsList from '../records/AllReceiptDetailsList';
import ImageUpload from '../records/ImageUpload';
import Spending from './Spending';

class Dashboard extends Component {
  constructor (props) {
    super(props)
      this.state = {
        userId: this.props.auth.uid
      }
    }
    
  render() {
    const { receiptDetails, auth } = this.props
    if (!auth.uid) return < Redirect to= '/signin'/>
    return (
      <div>
        <div className="dashboard-component">
          <AllReceiptDetailsList receiptDetails={receiptDetails}/>
          <Spending />
        </div>
          <ImageUpload/>
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
        orderBy: ['date', 'desc'] 
        ,where: [ 'authorId','==', !props.auth.uid ? null: props.auth.uid]
    }
  ])
)(Dashboard)
