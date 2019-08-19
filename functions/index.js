const functions = require('firebase-functions') 
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase) //allows use of firebase service
const express = require('express');
const app = express();
const axios = require('axios')
const cors = require('cors');
app.use(cors({ origin: true }));
const apiKey = require('./secrets') 

const createNotification = (notification => {
  return admin.firestore().collection('notifications')
  .add(notification)
  .then(doc => console.log('notification added', doc))
})

//create a trigger when a user is created using the auth service
exports.userJoined = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users')
  .doc(user.uid).get().then(doc => {
    const newUser = doc.data()
    const notification = {
      content: 'New member has joined',
      user: `${newUser.firstName} ${newUser.lastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification)
  })
})

app.post('/scan', async(req,res,next)=> {
  const imageUrl = req.body
  const stringedUrl = convertUrl(imageUrl)
  console.log('APIKEY', apiKey)

  try {
    const postData = {
      "url": stringedUrl,
      "refresh": false,
      "incognito": false,
      "ipAddress": "32.4.2.223",
      "near": "Kalamazoo, MI, USA",
      "ignoreMerchantName": "string",
      "language": "en"
    }
    const scannedReceiptData = await axios.post('https://api.taggun.io/api/receipt/v1/simple/url', postData,
      {
        headers:{'Content-Type': 'application/json', 
                  Accept: 'application/json', 
                  apiKey: apiKey
                }
      }
    )
    res.status(201).json(scannedReceiptData.data)
  } catch (error) {
    console.log('Error in posting receipt.', error);
    res.sendStatus(500);
  }
})
exports.api = functions.https.onRequest(app)

const createReceiptRecord = (receiptDetail => {
  return admin.firestore().collection('receiptDetails')
  .add(receiptDetail)
  .then(doc => console.log('Receipt details Added', doc))
})

exports.imageUpload = functions.firestore.document('imageUpload/{imageupload}').onCreate(async doc => {
  try {
    const imageData = doc.data()

    const taggunDetails = await axios.post('https://us-central1-frugalfriend-51334.cloudfunctions.net/api/scan',imageData.url)
    const receiptDetails = {
      imageUploadId: doc.id,
      totalAmount: taggunDetails.data.totalAmount.data,
      date: taggunDetails.data.date.data === undefined ? 'Date not found': taggunDetails.data.date.data,
      where: taggunDetails.data.merchantName.data === undefined ? 'Not Available': formatting(taggunDetails.data.merchantName.data),
      url: imageData.url
    }
    return createReceiptRecord(receiptDetails)
  } catch (error) {
    console.log('error in the imageUpload function:', error)
  }
})

//helper functions
const convertUrl = (imageUrl) => {
  const stringedUrl = JSON.stringify(imageUrl)
  const newUrl = stringedUrl.replace(/:/g,"=").replace(/,/,"&").replace(/=/,":").replace(/'/g,'').replace(/ /g,'').replace(/"/g,'').replace(/receipts[/]/,'receipts%2F').replace(/{/,'').replace(/}/,'')
return newUrl
}

const formatting = (name) => {
  const newName = name[0].toUpperCase() + name.slice(1).toLowerCase()
  return newName
}

