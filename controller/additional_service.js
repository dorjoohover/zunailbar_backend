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

exports.createAdditionalService = asyncHandler(async (req, res, next) => {
  const additional_service = await req.db.additional_service.create(req.body);

  res.status(200).json({
    success: true,
    data: additional_service,
  });
});

//  #     # ######  ######     #    ####### #######
//  #     # #     # #     #   # #      #    #
//  #     # #     # #     #  #   #     #    #
//  #     # ######  #     # #     #    #    #####
//  #     # #       #     # #######    #    #
//  #     # #       #     # #     #    #    #
//   #####  #       ######  #     #    #    #######

exports.updateAdditionalService = asyncHandler(async (req, res, next) => {
  let additional_service = await req.db.additional_service.findByPk(
    req.params.id
  );

  if (!additional_service) {
    throw new MyError(`Хэрэглэгч олдсонгүй.`, 400);
  }

  additional_service = await additional_service.update(req.body);

  res.status(200).json({
    success: true,
    data: additional_service,
  });
});

//  ######  #######  #####  ####### ######  ####### #     #
//  #     # #       #     #    #    #     # #     #  #   #
//  #     # #       #          #    #     # #     #   # #
//  #     # #####    #####     #    ######  #     #    #
//  #     # #             #    #    #   #   #     #    #
//  #     # #       #     #    #    #    #  #     #    #
//  ######  #######  #####     #    #     # #######    #

exports.destroyAdditionalService = asyncHandler(async (req, res, next) => {
  let additional_service = await req.db.additional_service.findByPk(
    req.params.id
  );

  if (!additional_service) {
    throw new MyError(`service олдсонгүй`, 400);
  }

  additional_service = await additional_service.destroy(req.body);

  res.status(200).json({
    success: true,
    data: additional_service,
  });
});

//   #####  ####### #######
//  #     # #          #
//  #       #          #
//  #  #### #####      #
//  #     # #          #
//  #     # #          #
//   #####  #######    #

exports.getAdditionalService = asyncHandler(async (req, res, next) => {
  let additional_service = await req.db.additional_service.findByPk(
    req.params.id
  );

  if (!additional_service) {
    throw new MyError(`main_error_employee_not_found`, 400);
  }

  res.status(200).json({
    success: true,
    data: additional_service,
  });
});

//    ##   #      #
//   #  #  #      #
//  #    # #      #
//  ###### #      #
//  #    # #      #
//  #    # ###### ######

exports.getAllAdditionalServices = asyncHandler(async (req, res, next) => {
  const additionalServices = await req.db.additional_service.findAll();
  res.status(200).json({
    success: true,
    data: additionalServices,
  });
});
