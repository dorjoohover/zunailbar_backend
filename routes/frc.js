const express = require('express')
const router = express.Router()

const { protect, authorize } = require("../middlewares/protect")

const { 
    company,
    attendance,
    vote,
    voteTest
} = require('../controller/frc')

router
    .route('/company/:id')
    .get(protect, authorize("0"), company)

router
    .route('/attendance/:id')
    .get(protect, authorize("0"), attendance)

router
    .route('/vote/:id')
    .get(protect, authorize("0"), vote)

router
    .route('/votetest')
    .post(voteTest)

module.exports = router