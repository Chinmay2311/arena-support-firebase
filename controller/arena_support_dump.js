const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const axios = require('axios');
const config = require('../config')
// const {firestore} = require('@google-cloud/firestore');

router.post('/savedata', function(req, res) {
    let documentRef = db.collection('arena_support').doc();
    const postData = req.body.support
    documentRef.create(req.body)
    .then(() => {
        res.send({
            "notice" : "Document saved successfully!",
            result : postData
        })
    })
    .then(()=> {
        return axios({
            method : 'POST',
            url : `${config.url}`,
            data : postData
        })
    })
    .then(result => console.log(result.data))
    .catch((err) => {
        res.send({
            "error" : err
        })
        console.log(`Failed to create document: ${err}`);
    });
})

module.exports = router;