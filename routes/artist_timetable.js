const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/protect");

const {
  getAllArtist_timetable,
  createService,
  getArtistsByService,
  destroyService,
  updateService,
  getAllServiceByGroup,
  createArtistTimetable,
} = require("../controller/artist_timetable");

router
  .route("/")
  .get(getAllArtist_timetable)
  .post(protect, authorize("0"), createService);

router.route("/servicesByGroups").get(getAllServiceByGroup);

router
  .route("/:id")
  .get(getArtistsByService)
  .delete(protect, authorize("0", "1"), destroyService)
  .put(protect, authorize("0", "1"), updateService)
  .post(protect, authorize("0", "1"), createArtistTimetable);

module.exports = router;
