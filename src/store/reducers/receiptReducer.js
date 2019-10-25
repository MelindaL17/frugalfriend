const initialState = {
  receiptDetails: [],
  status: ''
}

const receiptReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_RECEIPTS':
      return state
    case 'CREATE_RECEIPT':
       console.log('The created RECEIPT:', action.storedMetaData)
       return state
    case 'CREATE_RECEIPT_ERROR':
      console.log('create RECEIPT error', action.errpr)
      return {status: action.error}
    case 'SCANNED RECEIPT':
        console.log('SCANNED RECEIPT', action.scannedReceiptData.data)
        return action.scannedReceiptData.data
    case 'SCAN_RECEIPT_ERROR':
      console.log('SCAN_RECEIPT_ERROR', action.error)
      return action.receiptDetailDoc
    case 'EDIT_RECEIPT':
      return state
    case 'EDIT_RECEIPT_ERROR':
      return state
    case 'DELETED RECEIPT':
      return state
    case 'DELETE_RECEIPT_ERROR':
      return state
    default:
      return state
  }
}

export default receiptReducer
