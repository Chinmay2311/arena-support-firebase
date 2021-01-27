const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
let serviceAccount = require('/home/chinmay/Downloads/arena-support-firebase-adminsdk-r8tb3-97b1d432f5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://arena-support.firebaseio.com/"
  });

const app = express();

app.use(cors({ origin: true }));
app.listen(5001, () => {
    console.log("Server started on port 5001..");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const arenaSupport = require('./controller/arena_support_dump')
const saveResponse = require('./controller/kings_support_response')

app.use('/support', arenaSupport)
app.use('/support', saveResponse)
exports.app = functions.https.onRequest(app);