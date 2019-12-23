import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import { Redirect } from 'react-router-dom'
import DescendingReceiptDetailsList from '../records/DescendingReceiptDetailsList'
import AscendingReceiptDetailsList from '../records/AscendingReceiptDetailsList'
import ImageUpload from '../records/ImageUpload'
import Spending from './Spending'


class Dashboard extends Component {
  constructor (props) {
    super(props)
      this.state = {
        userId: this.props.auth.uid,
        selectedReceipt: '',
        dateSortByDescending: true,
        totalSpentSort: false
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
  
  handleDateSortToggle = () => {
    this.setState({
      dateSortByDescending: !this.state.dateSortByDescending
    })
    console.log(this.state.dateSortByDescending)
  }
  
  // handleAmountToggle = ()=> {
  //   this.setState({
      
  //   })
  // }
  
  // searchForExpenses = debounce(query => {
  //   this.setState({
  //     displayedStudents: this.state.allStudents.filter(student =>
  //       student.firstName.toLowerCase().includes(query) ||
  //       student.lastName.toLowerCase().includes(query)
  //     )
  //   });
  // }, 1000);
  
  
  // handleChange = (event) => {
  //   let input = event.target.value.toLowerCase()
  //   // this.se
  // }
  render() {
    const { receiptDetails, auth } = this.props
    const dateSortByDescending = this.state.dateSortByDescending
    if (!auth.uid) return < Redirect to= '/signin'/>
    
    if(dateSortByDescending) {
      return (
        <div className="main-container" >
          <div className="dashboard-component">
            <DescendingReceiptDetailsList
            receiptDetails={receiptDetails}
            handleToggle={this.handleToggle}
            handleDateSortToggle={this.handleDateSortToggle}/>
            <ImageUpload/>
          </div>
            <Spending receiptDetails={receiptDetails} select={this.state} handleClear={this.handleClear}/>
        </div>
      )
    } else {
      return (
        <div className="main-container" >
          <div className="dashboard-component">
            <AscendingReceiptDetailsList
            receiptDetails={receiptDetails}
            handleToggle={this.handleToggle}
            handleDateSortToggle={this.handleDateSortToggle}/>
            <ImageUpload/>
          </div>
            <Spending receiptDetails={receiptDetails} select={this.state} handleClear={this.handleClear}/>
        </div>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    receiptDetails: state.firestore.ordered.receiptDetails
  }
}

export default compose(
  connect(mapStateToProps,null))(Dashboard)
