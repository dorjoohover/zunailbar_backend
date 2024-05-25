const asyncHandler = require("express-async-handler");
const MyError = require("../utils/myError");
const moment = require("moment");
const { Op } = require("sequelize");

//   #####  ######  #######    #    ####### #######
//  #     # #     # #         # #      #    #
//  #       #     # #        #   #     #    #
//  #       ######  #####   #     #    #    #####
//  #       #   #   #       #######    #    #
//  #     # #    #  #       #     #    #    #
//   #####  #     # ####### #     #    #    #######

exports.createService = asyncHandler(async (req, res, next) => {
  const service = await req.db.service.create(req.body);

  service.password = "";

  res.status(200).json({
    success: true,
    data: service,
  });
});

//  #     # ######  ######     #    ####### #######
//  #     # #     # #     #   # #      #    #
//  #     # #     # #     #  #   #     #    #
//  #     # ######  #     # #     #    #    #####
//  #     # #       #     # #######    #    #
//  #     # #       #     # #     #    #    #
//   #####  #       ######  #     #    #    #######

exports.updateService = asyncHandler(async (req, res, next) => {
  let service = await req.db.service.findByPk(req.params.id);

  if (!service) {
    throw new MyError(`Хэрэглэгч олдсонгүй.`, 400);
  }

  service = await service.update(req.body);

  res.status(200).json({
    success: true,
    data: service,
  });
});

//  ######  #######  #####  ####### ######  ####### #     #
//  #     # #       #     #    #    #     # #     #  #   #
//  #     # #       #          #    #     # #     #   # #
//  #     # #####    #####     #    ######  #     #    #
//  #     # #             #    #    #   #   #     #    #
//  #     # #       #     #    #    #    #  #     #    #
//  ######  #######  #####     #    #     # #######    #

exports.destroyService = asyncHandler(async (req, res, next) => {
  let service = await req.db.service.findByPk(req.params.id);

  if (!service) {
    throw new MyError(`Хэрэглэгч олдсонгүй`, 400);
  }

  service = await service.destroy(req.body);

  res.status(200).json({
    success: true,
    data: service,
  });
});

//   #####  ####### #######
//  #     # #          #
//  #       #          #
//  #  #### #####      #
//  #     # #          #
//  #     # #          #
//   #####  #######    #

exports.getArtistsByService = asyncHandler(async (req, res, next) => {
  const formattedDate = moment().format("YYYY-MM-DD");

  // Fetch artist timetable
  const artistsByService = await req.db.artist_timetable.findAll({
    where: {
      date: {
        [Op.gte]: formattedDate,
      },
      artistId: req.params.id,
    },
  });

  // Fetch bookings for the artist
  const bookings = await req.db.booking.findAll({
    where: {
      date: {
        [Op.gte]: formattedDate,
      },
      artistId: req.params.id,
    },
  });

  // Create a map of booked times by date for faster lookup
  const bookedTimesMap = new Map();
  bookings.forEach((booking) => {
    if (!bookedTimesMap.has(booking.date)) {
      bookedTimesMap.set(booking.date, new Set());
    }
    let start = moment(booking.startTime, "HH:mm:ss");
    const end = moment(booking.endTime, "HH:mm:ss");
    while (start < end) {
      bookedTimesMap.get(booking.date).add(start.format("HH:mm:ss"));
      start.add(1, "hour");
    }
  });

  // Generate time slots excluding booked times
  const generateTimeSlots = (startTime, endTime, date) => {
    const start = moment(startTime, "HH:mm:ss");
    const end = moment(endTime, "HH:mm:ss");
    const timeSlots = [];

    while (start <= end) {
      const formattedTime = start.format("HH:mm:ss");
      if (!bookedTimesMap.get(date)?.has(formattedTime)) {
        timeSlots.push(formattedTime);
      }
      start.add(1, "hour");
    }

    return timeSlots;
  };

  const formattedArtistsByService = artistsByService.map((entry) => ({
    ...entry.dataValues, // Spread the existing properties
    timetable: generateTimeSlots(entry.startTime, entry.endTime, entry.date), // Generate timetable
  }));

  res.status(200).json({
    success: true,
    data: formattedArtistsByService,
  });
});
//    ##   #      #
//   #  #  #      #
//  #    # #      #
//  ###### #      #
//  #    # #      #
//  #    # ###### ######

exports.getAllArtist_timetable = asyncHandler(async (req, res, next) => {
  console.log("getAllService");
  let service = await req.db.artist_timetable.findAll();
  res.status(200).json({
    success: true,
    data: service,
  });
});

exports.getAllServiceByGroup = asyncHandler(async (req, res, next) => {
  const servicesByGroups = await req.db.service_group.findAll({
    include: [
      {
        model: req.db.service,
        // include: {
        //   model: req.db.discussion,
        //   where: {
        //     companyId: companyId,
        //   },
        // },
      },
    ],
  });
  res.status(200).json({
    success: true,
    data: servicesByGroups,
  });
});

exports.createArtistTimetable = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const ExArtist_timetable = await req.db.artist_timetable.findOne({
    where: {
      artistId: req.params.id,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    },
  });
  if (!ExArtist_timetable) {
    var artist_timetable = await req.db.artist_timetable.create(req.body);
  } else {
    throw new MyError(`timetable давхацаж байна`, 400);
  }
  res.status(200).json({
    success: true,
    data: artist_timetable,
  });
});
