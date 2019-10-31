import React, { Component } from 'react'
import {connect} from 'react-redux'
// import { firestoreConnect } from 'react-redux-firebase' //binds to react
// import {compose} from 'redux'
import { Redirect } from 'react-router-dom'
// import moment from 'moment'

class Spending extends Component {
  render() {
    const { auth } = this.props
    
    if (!auth.uid) return < Redirect to= '/signin'/>
    return (
      <div className="spending-Componenet">Place Holder Spending Component

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
// const authID = 'ji'

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([
//     {collection: 'receiptDetails', equalTo: ['authorId', authID]}
//   ])
// )(Spending)

export default 
  connect(mapStateToProps)(Spending)
