const express = require('express')
const router = express.Router()

const { protect, authorize } = require("../middlewares/protect")

const { sendPhoneReq } = require('../controller/phone')

router
    .route('/')
    .post(protect, authorize("0", "1"), sendPhoneReq)



module.exports = router
