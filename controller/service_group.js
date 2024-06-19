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

exports.createServiceGroup = asyncHandler(async (req, res, next) => {
  const service_group = await req.db.service_group.create(req.body);

  res.status(200).json({
    success: true,
    data: service_group,
  });
});

//  #     # ######  ######     #    ####### #######
//  #     # #     # #     #   # #      #    #
//  #     # #     # #     #  #   #     #    #
//  #     # ######  #     # #     #    #    #####
//  #     # #       #     # #######    #    #
//  #     # #       #     # #     #    #    #
//   #####  #       ######  #     #    #    #######

exports.updateServiceGroup = asyncHandler(async (req, res, next) => {
  let service_group = await req.db.service_group.findByPk(req.params.id);

  if (!service_group) {
    throw new MyError(`Хэрэглэгч олдсонгүй.`, 400);
  }

  service_group = await service_group.update(req.body);

  res.status(200).json({
    success: true,
    data: service_group,
  });
});

//  ######  #######  #####  ####### ######  ####### #     #
//  #     # #       #     #    #    #     # #     #  #   #
//  #     # #       #          #    #     # #     #   # #
//  #     # #####    #####     #    ######  #     #    #
//  #     # #             #    #    #   #   #     #    #
//  #     # #       #     #    #    #    #  #     #    #
//  ######  #######  #####     #    #     # #######    #

exports.destroyServiceGroup = asyncHandler(async (req, res, next) => {
  let service_group = await req.db.service_group.findByPk(req.params.id);

  if (!service_group) {
    throw new MyError(`Хэрэглэгч олдсонгүй`, 400);
  }

  service_group = await service_group.destroy(req.body);

  res.status(200).json({
    success: true,
    data: service_group,
  });
});

//   #####  ####### #######
//  #     # #          #
//  #       #          #
//  #  #### #####      #
//  #     # #          #
//  #     # #          #
//   #####  #######    #

exports.getService = asyncHandler(async (req, res, next) => {
  let service_group = await req.db.service_group.findByPk(req.params.id);

  if (!service_group) {
    throw new MyError(`main_error_employee_not_found`, 400);
  }

  res.status(200).json({
    success: true,
    data: service_group,
  });
});

//    ##   #      #
//   #  #  #      #
//  #    # #      #
//  ###### #      #
//  #    # #      #
//  #    # ###### ######

exports.getAllServiceGroups = asyncHandler(async (req, res, next) => {
  let service_group = await req.db.service_group.findAll();
  res.status(200).json({
    success: true,
    data: service_group,
  });
});

exports.getAllServiceByGroup = asyncHandler(async (req, res, next) => {
  let service = await req.db.service.findAll();
  res.status(200).json({
    success: true,
    data: service,
  });
});
