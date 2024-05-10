const express = require("express");
const router = express.Router();
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();

const { upload, private, excel, csv } = require("../controller/upload");

router.route("/").post(
  // multipartMiddleware,
  upload
);

router.route("/private").post(
  // multipartMiddleware,
  private
);

router.route("/excel").post(excel);

router.route("/csv").post(csv);

module.exports = router;
