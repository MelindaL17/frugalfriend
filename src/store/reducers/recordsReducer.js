const initialState = {
  records: []
}
const recordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_RECORD':
       console.log('created record:', action.record)
       return state
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error', action.err)
      return state
    default:
      return state
  }
}

export default recordsReducer
