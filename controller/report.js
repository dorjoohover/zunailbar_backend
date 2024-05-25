const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/email");
const MyError = require("../utils/myError");
const moment = require("moment");
const { Op } = require("sequelize");

exports.createBooking = asyncHandler(async (req, res, next) => {
  console.log("req.body", req.body);
  var user = await req.db.customer.findOne({
    where: { id: req.body.customerId },
  });
  var artist = await req.db.artist.findOne({
    where: { id: req.body.artistId },
  });
  var exBooking = await req.db.booking.findOne({
    where: {
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      customerId: req.body.customerId,
      serviceId: req.body.serviceId,
      artistId: req.body.artistId,
    },
  });
  if (!exBooking) {
    const createdBooking = await req.db.booking.create(req.body);
    //   return res.status(200).json(createdOrder);
    const historyLink = `${process.env.FRONTEND}/customer-bookings`;

    var message = `Сайн байна уу? <br><br>Zu Nailbar -д захиалга өглөө. <br> Таны цаг захиалгын дэлгэрэнгүй:
  <br><br>Үйлчлүүлэгчийн утасны дугаар: ${user.phone}
  <br><br>Огноо: ${createdBooking.date}
  <br><br>Эхлэх цаг: ${createdBooking.startTime}
  <br><br>Дуусах цаг: ${createdBooking.endTime}
  <br><br>Артистийн нэр: ${artist.firstName}
  <br><br><a href="${historyLink}">Захиалгын түүхээ харах</a>
  <br><br>Өдрийг сайхан өнгөрүүлээрэй.`;

    await sendEmail({
      email: user.email,
      from: "Zu Nailbar Salon",
      subject: "Цаг захиалгын дэлгэрэнгүй",
      html: message,
    });
    res.status(200).json({
      success: true,
      data: createdBooking,
    });
  } else {
    throw new MyError("Таны цаг захиалга давхацаж байна", 400);
  }
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
    console.log("req.body", req.body.value);
    let booking = await req.db.booking.findByPk(req.params.bookingId);

    if (!booking) {
      throw new MyError(`Хэрэглэгч олдсонгүй.`, 400);
    }
    // if (req.body.value.additional_services.length > 0) {

    //   let booking_detail = [];

    //   for (const element of req.body.value.additional_services) {
    //     // Check if the entry already exists
    //     const existingEntry = await req.db.booking_detail.findOne({
    //       where: {
    //         bookingId: req.body.value.id,
    //         additionalServiceId: element, // Corrected the column name here
    //       },
    //     });

    //     // If it doesn't exist, create a new entry
    //     if (!existingEntry) {
    //       await req.db.booking_detail.create({
    //         bookingId: req.body.value.id,
    //         additionalServiceId: element, // Corrected the column name here
    //       });

    //       booking_detail.push({
    //         bookingId: req.body.value.id,
    //         additionalServiceId: element, // Corrected the column name here
    //       });
    //     }
    //   }
    // }
    // delete req.body.value.additional_services;
    let booking_detail = [];
    for (const [key, value] of Object.entries(req.body.value)) {
      var objKey = key.split("-");
      switch (objKey[0]) {
        case "additional_service":
          var booking_detail_value = {
            custom_price: value,
            additionalServiceId: parseInt(objKey[1]),
            bookingId: req.params.bookingId,
          };
          booking_detail.push(booking_detail_value);
          const existingEntry = await req.db.booking_detail.findOne({
            where: {
              bookingId: req.params.bookingId,
              additionalServiceId: parseInt(objKey[1]),
            },
          });
          if (!existingEntry) {
            await req.db.booking_detail
              .create(booking_detail_value)
              .catch((err) => {
                console.log("$:/error/err", err);
                throw new MyError("main_error_bookingDetail", 400); //санал өгөхөд алдаа гарлаа
              });
          } else {
            existingEntry.custom_price = value;
            await existingEntry.update(booking_detail_value).catch((err) => {
              console.log("$:/error/err", err);
              throw new MyError("main_error_bookingDetail", 400); //санал өгөхөд алдаа гарлаа
            });
          }
          break;
      }
    }
    // console.log(req.params.bookingId);
    res.status(200).json({
      success: true,
      data: { booking, booking_detail },
    });
  }
);

exports.destroyBooking = asyncHandler(async (req, res, next) => {
  console.log("req.params.bookingId", req.params.bookingId);
  let booking = await req.db.booking.findByPk(req.params.bookingId);

  if (!booking) {
    throw new MyError(`service олдсонгүй`, 400);
  }

  booking = await booking.destroy(req.body);

  res.status(200).json({
    success: true,
    data: booking,
  });
});

exports.getTotalIncome = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const startDate = moment(req.body.startDate).format("YYYY-MM-DD");
  const endDate = moment(req.body.endDate).format("YYYY-MM-DD");
  const bookings = await req.db.booking.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: req.db.service,
      },
      {
        model: req.db.booking_detail,
      },
    ],
  });

  if (!bookings || bookings.length === 0) {
    throw new MyError(`Bookings not found`, 400);
  }

  let totalIncome = 0;

  bookings.forEach((booking) => {
    // Add the service price
    if (booking.service && booking.service.price) {
      totalIncome += parseFloat(booking.service.price);
    }

    // Add the custom prices from booking details
    if (booking.booking_details && booking.booking_details.length > 0) {
      booking.booking_details.forEach((detail) => {
        if (detail.custom_price) {
          totalIncome += parseFloat(detail.custom_price);
        }
      });
    }
  });

  res.status(200).json({
    success: true,
    data: totalIncome,
  });
});

exports.getArtistIncome = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const startDate = moment(req.body.startDate).format("YYYY-MM-DD");
  const endDate = moment(req.body.endDate).format("YYYY-MM-DD");
  const bookings = await req.db.booking.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      artistId: req.body.artistId,
    },
    include: [
      {
        model: req.db.service,
      },
      {
        model: req.db.booking_detail,
      },
    ],
  });

  if (!bookings || bookings.length === 0) {
    throw new MyError(`Bookings not found`, 400);
  }

  let totalIncome = 0;

  bookings.forEach((booking) => {
    // Add the service price
    if (booking.service && booking.service.price) {
      totalIncome += parseFloat(booking.service.price);
    }

    // Add the custom prices from booking details
    if (booking.booking_details && booking.booking_details.length > 0) {
      booking.booking_details.forEach((detail) => {
        if (detail.custom_price) {
          totalIncome += parseFloat(detail.custom_price);
        }
      });
    }
  });

  res.status(200).json({
    success: true,
    data: totalIncome,
  });
});

exports.getServiceIncome = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const startDate = moment(req.body.startDate).format("YYYY-MM-DD");
  const endDate = moment(req.body.endDate).format("YYYY-MM-DD");
  const bookings = await req.db.booking.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
      serviceId: req.body.serviceId,
    },
    include: [
      {
        model: req.db.service,
      },
      {
        model: req.db.booking_detail,
      },
    ],
  });

  if (!bookings || bookings.length === 0) {
    throw new MyError(`Bookings not found`, 400);
  }

  let totalIncome = 0;

  bookings.forEach((booking) => {
    // Add the service price
    if (booking.service && booking.service.price) {
      totalIncome += parseFloat(booking.service.price);
    }

    // Add the custom prices from booking details
    if (booking.booking_details && booking.booking_details.length > 0) {
      booking.booking_details.forEach((detail) => {
        if (detail.custom_price) {
          totalIncome += parseFloat(detail.custom_price);
        }
      });
    }
  });

  res.status(200).json({
    success: true,
    data: totalIncome,
  });
});