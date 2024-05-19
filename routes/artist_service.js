const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/protect");

const {
  getAllService,
  createService,
  getArtistsByService,
  destroyService,
  updateService,
  getAllServiceByGroup,
} = require("../controller/artist_service");

router
  .route("/")
  .get(getAllService)
  .post(protect, authorize("0"), createService);

router.route("/servicesByGroups").get(getAllServiceByGroup);

router
  .route("/:id")
  .get(getArtistsByService)
  .delete(protect, authorize("0"), destroyService)
  .put(protect, authorize("0"), updateService);

module.exports = router;
