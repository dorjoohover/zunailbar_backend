const asyncHandler = require("express-async-handler");
const MyError = require("../utils/myError");
// const moment = require("moment");

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
  //   let service = await req.db.service.findByPk(req.params.id);
  console.log(req.params.id);
  const artistsByService = await req.db.artist.findAll({
    // where: { serviceId: req.params.id },
    include: [
      {
        model: req.db.artist_service,
        where: { serviceId: req.params.id },
        // include: {
        //   model: req.db.discussion,
        //   where: {
        //     companyId: companyId,
        //   },
        // },
      },
    ],
  });
  //   const artistsByService = await req.db.artist_service.findAll({
  //     where: { serviceId: req.params.id },
  //     include: [
  //       {
  //         model: req.db.artist,
  //         // include: {
  //         //   model: req.db.discussion,
  //         //   where: {
  //         //     companyId: companyId,
  //         //   },
  //         // },
  //       },
  //     ],
  //   });
  //   if (!service) {
  //     throw new MyError(`main_error_employee_not_found`, 400);
  //   }

  res.status(200).json({
    success: true,
    data: artistsByService,
  });
});

//    ##   #      #
//   #  #  #      #
//  #    # #      #
//  ###### #      #
//  #    # #      #
//  #    # ###### ######

exports.getAllService = asyncHandler(async (req, res, next) => {
  console.log("getAllService");
  let service = await req.db.service.findAll();
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
