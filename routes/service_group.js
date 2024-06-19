const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/protect");

const {
  getAllServiceGroups,
  createServiceGroup,
  getService,
  destroyServiceGroup,
  updateServiceGroup,
  getAllServiceByGroup,
} = require("../controller/service_group");

router
  .route("/")
  .get(getAllServiceGroups)
  .post(protect, authorize("0"), createServiceGroup);

// router.route("/servicesByGroups").get(getAllServiceByGroup);

router
  .route("/:id")
  .get(getService)
  .delete(protect, authorize("0"), destroyServiceGroup)
  .put(protect, authorize("0"), updateServiceGroup);

module.exports = router;
