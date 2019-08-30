import React from 'react'


const Form = (props) => (
<div className='form-container'>
  <form onSubmit={props.handleSubmit}>
    {/* <input name='date'type='text' onChange={props.handleChange} value={moment(props.date, moment.ISO_8601).calendar()} /> */}

      <label> Place </label>
      <input className="input-for-edit" name='where' type='text' onChange={props.handleChange} value={props.where} />

      <label> Total Spent </label>
      <input className="input-for-edit" name='totalAmount' type='text' onChange={props.handleChange} value={props.totalAmount} />

    <button className="finish-edit-button"type='submit'> Done Editing</button>
  </form>
</div>
)

export default Form
// font-family: 'Trebuchet MS';
