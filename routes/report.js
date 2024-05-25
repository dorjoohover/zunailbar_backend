const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/protect");

const {
  createBooking,
  getAllBooking,
  getAllBookingByArtistId,
  createAdditionalServiceByBookingId,
  destroyBooking,
  getTotalIncome,
  getArtistIncome,
  getServiceIncome,
} = require("../controller/report");

router.route("/").post(createBooking).get(getAllBooking);
router.route("/getTotalIncome").post(
  // protect,
  getTotalIncome
);
router.route("/getArtistIncome").post(
  // protect,
  getArtistIncome
);
router.route("/getServiceIncome").post(
  // protect,
  getServiceIncome
);
router
  .route("/:id")
  .get(getAllBookingByArtistId)
  .post(createAdditionalServiceByBookingId)
  .delete(protect, destroyBooking);
//   .put(protect, updateOrder);
// router.route("/getOrdersByUserId/:userId").get(protect, getOrderByUserId);
// router
//   .route("/getOrdersByEmployeeId/:employeeId")
//   .get(protect, getOrderByEmpId);

module.exports = router;
