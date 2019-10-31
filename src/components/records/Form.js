import React from 'react'

const Form = (props) => (
  <div className='form-container'>

  <form onSubmit={props.handleSubmit}>
  <label>Date</label>
    <input className="input-for-edit" name='date'type='text' onChange={props.handleChange} value={props.date} />
    <label>Place</label>
      <input className="input-for-edit" placeholder="Email" name='where' type='text' onChange={props.handleChange} value={props.where} />

      <label> Total Spent </label>
      <input className="input-for-edit" name='totalAmount' type='text' onChange={props.handleChange} value={props.totalAmount} />

    <button className="finish-edit-button"type='submit'> Done Editing</button>
  </form>
</div>
)

export default Form
