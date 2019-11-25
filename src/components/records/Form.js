import React from "react";
import { Button } from "semantic-ui-react";

const Form = props => (
  <div>
    <form className="receipt-edit-row" onSubmit={props.handleSubmit}>
      <span className="input-span-cell">
        {/* <label>Date</label> */}
        <input
          name="date"
          type="text"
          onChange={props.handleChange}
          value={props.date}
        />
      </span>

      <span className="input-span-cell">
        {/* <label>Place</label> */}
        <input
          placeholder="Email"
          name="where"
          type="text"
          onChange={props.handleChange}
          value={props.where}
        />
      </span>

      <span className="input-span-cell">
        {/* <label> Total Spent </label> */}
        <input
          name="totalAmount"
          type="text"
          onChange={props.handleChange}
          value={props.totalAmount}
        />
      </span>
      <Button positive color="blue" > Done </Button>

    </form>
  </div>
);

export default Form;
