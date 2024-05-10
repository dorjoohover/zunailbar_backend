const express = require('express')
const { protect, authorize } = require('../middlewares/protect')
const router = express.Router()
const {
    zoomSignature
} = require('../controller/zoom.js')

router
    .route('/')
    .get((req, res, next) => {
        res.render('index.pug')
    })

module.exports = router
