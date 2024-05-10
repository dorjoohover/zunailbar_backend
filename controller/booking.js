const asyncHandler = require("express-async-handler");

exports.createBooking = asyncHandler(async (req, res, next) => {
  console.log("req.body", req.body);
  const createdBooking = await req.db.booking.create(req.body);
  //   return res.status(200).json(createdOrder);
  res.status(200).json({
    success: true,
    data: createdBooking,
  });
});

exports.getAllBooking = asyncHandler(async (req, res, next) => {
  let bookings = await req.db.booking.findAll();
  res.status(200).json({
    success: true,
    data: bookings,
  });
});
