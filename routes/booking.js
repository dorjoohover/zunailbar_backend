const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/protect");

const {
  createBooking,
  getAllBooking,
  getAllBookingByArtistId,
  createAdditionalServiceByBookingId,
} = require("../controller/booking");

router.route("/").post(createBooking).get(getAllBooking);
// router.route("/getAvailableTimes").get(protect, getAvailableTimes);
router
  .route("/:bookingId")
  .get(getAllBookingByArtistId)
  .post(createAdditionalServiceByBookingId);
//   .delete(protect, deleteOrder)
//   .put(protect, updateOrder);
// router.route("/getOrdersByUserId/:userId").get(protect, getOrderByUserId);
// router
//   .route("/getOrdersByEmployeeId/:employeeId")
//   .get(protect, getOrderByEmpId);

module.exports = router;
