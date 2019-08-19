import React from 'react'


const Form = (props) => (
<div>
  <form onSubmit={props.handleSubmit}>
    {/* <input name='date'type='text' onChange={props.handleChange} value={moment(props.date, moment.ISO_8601).calendar()} /> */}
    <input name='where' type='text' onChange={props.handleChange} value={props.where} />
    <input name='totalAmount' type='text' onChange={props.handleChange} value={props.totalAmount} />
    <button type='submit'>Done Editing</button>
  </form>
  
</div>
)

export default Form
