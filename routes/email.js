const express = require('express')
const router = express.Router()

const { protect, authorize } = require("../middlewares/protect")

const { 
    sendEmailReq,
    sendMailToCompany,
    sendSms,
} = require('../controller/email')

router
    .route('/')
    .post(protect, authorize("0", "1"), sendEmailReq);

router
    .route("/sms")
    .post(sendSms);

router
    .route('/company')
    .post(protect, authorize("0", "1"), sendMailToCompany)

module.exports = router
