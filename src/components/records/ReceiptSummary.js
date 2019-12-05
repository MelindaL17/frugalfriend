import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { deleteReceiptDetails } from "../../store/actions/receiptActions";
import EditReceiptDetails from "./EditReceiptDetails";


class ReceiptSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = (event, data) => {
    event.preventDefault();
    this.props.deleteReceipt(data.value);
  };

  handleClick = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
  };

  render() {
    const { receiptDetail } = this.props;

    return (
      <div>
        <div className="receipt-row">
          <span className="cell">
            {moment(receiptDetail.date, moment.ISO_8601).format("L")}
          </span>
          <span className="cell">{receiptDetail.where}</span>
          <span className="cell">${receiptDetail.totalAmount}</span>
          <span className="cell">
            {this.state.isEditing ? (
              <div>
                <span className="minus-min">Minimize</span>
                <Icon
                  name="minus"
                  color="red"
                  onClick={this.handleClick}
                  size="large"
                />
              </div>
            ) : (
              <div className="edit-div">
              <span className="edit-text">Edit</span>
                <Icon name="edit outline" color="blue"
                  size="big" onClick={this.handleClick} />
              </div>
            )}
            {/* <Link to={`/receiptDetail/${receiptDetail.id}`}>
              <Icon name="angle double right" size="large"/>
            </Link> */}


            <Icon
              name="picture"
              color="blue"
              size="large"
              onClick={this.props.handleToggle}
              value={receiptDetail.id}
            />

            <Icon
              name="delete"
              color="red"
              value={receiptDetail.id}
              link
              onClick={this.handleChange}
              size="big"
              />

          </span>
        </div>
        {this.state.isEditing ? (
          <EditReceiptDetails receiptDetail={receiptDetail} />
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteReceipt: receiptDetailId =>
      dispatch(deleteReceiptDetails(receiptDetailId))
  };
};

export default connect(null, mapDispatchToProps)(ReceiptSummary);
