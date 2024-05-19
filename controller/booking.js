const asyncHandler = require("express-async-handler");
const MyError = require("../utils/myError");

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

exports.getAllBookingByArtistId = asyncHandler(async (req, res, next) => {
  console.log("req.params.id", req.params.id);
  let bookings = await req.db.booking.findAll({
    where: {
      // date: element.date,
      // date: {
      //   [Sequelize.Op.gte]: formattedDate,
      // },
      artistId: req.params.bookingId,
    },
  });
  res.status(200).json({
    success: true,
    data: bookings,
  });
});

exports.createAdditionalServiceByBookingId = asyncHandler(
  async (req, res, next) => {
    console.log("req.body", req.body);
    let booking_detail = [];
    if (req.body.value.additional_services.length > 0) {
      let booking_detail = [];

      for (const element of req.body.value.additional_services) {
        // Check if the entry already exists
        const existingEntry = await req.db.booking_detail.findOne({
          where: {
            bookingId: req.body.value.id,
            additionalServiceId: element, // Corrected the column name here
          },
        });

        // If it doesn't exist, create a new entry
        if (!existingEntry) {
          await req.db.booking_detail.create({
            bookingId: req.body.value.id,
            additionalServiceId: element, // Corrected the column name here
          });

          booking_detail.push({
            bookingId: req.body.value.id,
            additionalServiceId: element, // Corrected the column name here
          });
        }
      }
    }
    delete req.body.value.additional_services;
    console.log(req.params.bookingId);
    let booking = await req.db.booking.findByPk(req.params.bookingId);

    if (!booking) {
      throw new MyError(`Хэрэглэгч олдсонгүй.`, 400);
    }

    booking = await booking.update(req.body.value);
    // const createdBooking = await req.db.booking.create(req.body);
    // //   return res.status(200).json(createdOrder);
    res.status(200).json({
      success: true,
      data: booking,
    });
  }
);
