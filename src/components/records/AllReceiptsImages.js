import React, {Component} from 'react'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' //binds to react
import {compose} from 'redux'
import ReceiptList from './ReceiptList'


class AllReceiptsImages extends Component {
  
  render() {
  console.log(this.props.receipts, 'All Receipt Comp')
  const {receipts} = this.props  
  return(
      <div>
        <h1>Receipts in Storage</h1>
        <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ReceiptList receipts={receipts}/>
          </div>
        </div>
      </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    receipts: state.firestore.ordered.imageUpload
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'imageUpload', orderBy: ['createdAt', 'desc']}
  ])
)(AllReceiptsImages)
