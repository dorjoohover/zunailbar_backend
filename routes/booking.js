const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/protect");

const { createBooking, getAllBooking } = require("../controller/booking");

router.route("/").post(createBooking).get(getAllBooking);
// router.route("/getAvailableTimes").get(protect, getAvailableTimes);
// router
//   .route("/:orderId")
//   .delete(protect, deleteOrder)
//   .put(protect, updateOrder);
// router.route("/getOrdersByUserId/:userId").get(protect, getOrderByUserId);
// router
//   .route("/getOrdersByEmployeeId/:employeeId")
//   .get(protect, getOrderByEmpId);

module.exports = router;
