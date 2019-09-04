const axios = require('axios')

export const getAllReceipts = () => {
  return async(dispatch, getState, {getFirebase, getFirestore}) => {
    try {
      const firebase = await getFirebase()
      const allReceipts = await firebase.storage().ref(`receipts/`).listAll()
      dispatch ({type: 'GET_ALL_RECEIPTS', allReceipts})
    } catch (error) {
      console.log(error)
    }
  }
}

// export const getAllUserReceipt = (userId) => {
//   return async (dispatch, getState, {getFirebase, getFirestore}) => {
//     try {
//       const firestore = await getFirestore()
//       const receiptDetailRef = await firestore.collection('receiptDetails').doc(receiptId).get()
//     } catch (error) {
      
//     }
//   }
// }

export const uploadReceipt = (receipt) => {
  return async(dispatch, getState, {getFirebase, getFirestore}) => {
    try {
      //store into firebase storage
      const firebase = await getFirebase()
      const storageRef = await firebase.storage().ref(`receipts/${receipt.image.name}`)
      //saves image in storage
       await storageRef.put(receipt.image)
      const downloadURL = await firebase.storage().ref('receipts').child(receipt.image.name).getDownloadURL()
      //store metadata in firebase 
      const firestore = await getFirestore()
      const profile = await getState().firebase.profile
      const authorId = getState().firebase.auth.uid
      const storedMetaData = await firestore.collection("imageUpload").add({
        firstName: profile.firstName,
        lastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
        url: downloadURL,
      })
      dispatch({type: 'CREATE_RECEIPT', storedMetaData})
    } catch (error) {
      dispatch({type: 'CREATE_RECEIPT_ERROR', error})
    }
  }
}

export const deleteReceiptDetails = (receiptId) => {
  return async(dispatch, getState, {getFirebase, getFirestore}) => {
    try {
      const firestore = await getFirestore()
      const receiptDetailRef = await firestore.collection('receiptDetails').doc(receiptId).get()
      const receiptDetailDoc = receiptDetailRef.data()
      await firestore.collection('receiptDetails').doc(receiptId).delete()
      await firestore.collection('imageUpload').doc(receiptDetailDoc.imageUploadId).delete()
      dispatch({type: 'DELETED RECEIPT', receiptDetailDoc})
    } catch (error) {
      dispatch ({type: 'DELETE_RECEIPT_ERROR', error})
    }
  }
}

export const editReceiptDetails = (receiptId, updatedReceiptInfo) => {
  return async(dispatch, getState, {getFirebase, getFirestore}) => {
    try {
      const firestore = await getFirestore()
      const receiptDetailRef = await firestore.collection('receiptDetails').doc(receiptId).update(updatedReceiptInfo)
     
      console.log('UPDATED RECEIPT DETAILS:',updatedReceiptInfo, receiptDetailRef)
      dispatch({type:'EDIT_RECEIPT', updatedReceiptInfo})
    } catch (error) {
      dispatch ({type: 'EDIT_RECEIPT_ERROR', error})
    }
  }
}

//Only used for TESTING THE SCAN RECEIPT WITH AXIOS TO CALL THE BACKEND
export const scanReceipt = (imageUrl) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    try {
      const scannedReceiptData = await axios.post('https://us-central1-frugalfriend-51334.cloudfunctions.net/api/scan',  imageUrl)
      dispatch({type: 'SCANNED RECEIPT', scannedReceiptData})
    } catch (error) {
      dispatch ({type: 'SCAN_RECEIPT_ERROR', error})
    }
  }
}
