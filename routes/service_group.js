const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/protect");

const {
  getAllServiceGroups,
  createService,
  getService,
  destroyService,
  updateService,
  getAllServiceByGroup,
} = require("../controller/service_group");

router
  .route("/")
  .get(getAllServiceGroups)
  .post(protect, authorize("0"), createService);

// router.route("/servicesByGroups").get(getAllServiceByGroup);

router
  .route("/:id")
  .get(getService)
  .delete(protect, authorize("0"), destroyService)
  .put(protect, authorize("0"), updateService);

module.exports = router;
