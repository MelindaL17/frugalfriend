export const createRecord = (record) => {
  return async(dispatch, getState, {getFirebase, getFirestore}) => {
    try {
      const firestore = await getFirestore()
      const profile = await getState().firebase.profile
      const authorId = getState().firebase.auth.uid
      firestore.collection('records').add({
        ...record,
        firstName: profile.firstName,
        lastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      dispatch({type: 'CREATE_RECORD', record})
    } catch (error) {
      dispatch({type: 'CREATE_RECORD_ERROR', error})
    }
  }
}
