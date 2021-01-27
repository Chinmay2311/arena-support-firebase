const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const axios = require('axios');

router.post('/saveresponse', function(req, res) {
    let documentRef = db.collection('arena_support').doc();
    const responseData = req.body.support
    documentRef.create(req.body)
    .then(() => {
        res.send({
            "notice" : "Document saved successfully!",
            result : responseData
        })
    })
    .catch((err) => {
        res.err({
            "error" : err
        })
        console.log(`Failed to create document: ${err}`);
    });
})

module.exports = router;