const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/protect");

const {
  createAdditionalService,
  getAdditionalService,
  destroyAdditionalService,
  updateAdditionalService,
  getAllAdditionalServices,
} = require("../controller/additional_service");

router
  .route("/")
  .get(getAllAdditionalServices)
  .post(protect, authorize("0"), createAdditionalService);

router
  .route("/:id")
  .get(getAdditionalService)
  .delete(protect, authorize("0"), destroyAdditionalService)
  .put(protect, authorize("0"), updateAdditionalService);

module.exports = router;
