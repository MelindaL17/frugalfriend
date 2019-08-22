import {combineReducers} from 'redux'
import authReducer from './authReducer'

import receiptReducer from './receiptReducer'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
 authReducer,
 receiptReducer,
 firestore: firestoreReducer,
 firebase: firebaseReducer
})

export default rootReducer
