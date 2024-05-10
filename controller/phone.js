const MyError = require('../utils/myError')
const asyncHandler = require('express-async-handler')
const sendSMS = require('../utils/sms')


exports.sendPhoneReq = asyncHandler(async(req, res, next) => {

    await sendSMS({
        phone: req.body.phone,
        subject: req.body.subject,
        messageMn: req.body.mnmessage,
        messageEn: req.body.mnmessage
    })

    res.status(200).json({
        success: true,
        data: 'Амжилттай.'
    })
})