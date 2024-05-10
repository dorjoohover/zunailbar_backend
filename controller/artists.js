const asyncHandler = require("express-async-handler");
const MyError = require("../utils/myError");
const moment = require("moment");

const getCookieOptions = () => {
  return {
    expires: moment().add(2, "h").utc(8).toDate(),
    httpOnly: process.env.COOKIE_ENV === "development" ? true : false,
    secure: process.env.COOKIE_ENV === "development" ? false : true,
    sameSite: process.env.COOKIE_ENV === "development" ? null : "none",
  };
};

//   #####  ######  #######    #    ####### #######
//  #     # #     # #         # #      #    #
//  #       #     # #        #   #     #    #
//  #       ######  #####   #     #    #    #####
//  #       #   #   #       #######    #    #
//  #     # #    #  #       #     #    #    #
//   #####  #     # ####### #     #    #    #######

exports.createEmployee = asyncHandler(async (req, res, next) => {
  // req.body.action = "craete employee";

  const user = await req.db.employee.create(req.body);

  user.password = "";

  res.status(200).json({
    success: true,
    data: user,
  });
});

//  #     # ######  ######     #    ####### #######
//  #     # #     # #     #   # #      #    #
//  #     # #     # #     #  #   #     #    #
//  #     # ######  #     # #     #    #    #####
//  #     # #       #     # #######    #    #
//  #     # #       #     # #     #    #    #
//   #####  #       ######  #     #    #    #######

exports.updateEmployee = asyncHandler(async (req, res, next) => {
  let employee = await req.db.employee.findByPk(req.params.id);

  if (!employee) {
    throw new MyError(`Хэрэглэгч олдсонгүй.`, 400);
  }

  employee = await employee.update(req.body);

  res.status(200).json({
    success: true,
    data: employee,
  });
});

//  ######  #######  #####  ####### ######  ####### #     #
//  #     # #       #     #    #    #     # #     #  #   #
//  #     # #       #          #    #     # #     #   # #
//  #     # #####    #####     #    ######  #     #    #
//  #     # #             #    #    #   #   #     #    #
//  #     # #       #     #    #    #    #  #     #    #
//  ######  #######  #####     #    #     # #######    #

exports.destroyEmployee = asyncHandler(async (req, res, next) => {
  let employee = await req.db.employee.findByPk(req.params.id);

  if (!employee) {
    throw new MyError(`Хэрэглэгч олдсонгүй`, 400);
  }

  employee = await employee.destroy(req.body);

  res.status(200).json({
    success: true,
    data: employee,
  });
});

//   #####  ####### #######
//  #     # #          #
//  #       #          #
//  #  #### #####      #
//  #     # #          #
//  #     # #          #
//   #####  #######    #

exports.getEmployee = asyncHandler(async (req, res, next) => {
  let employee = await req.db.employee.findByPk(req.params.id);

  if (!employee) {
    throw new MyError(`main_error_employee_not_found`, 400);
  }

  res.status(200).json({
    success: true,
    data: employee,
  });
});

//    ##   #      #
//   #  #  #      #
//  #    # #      #
//  ###### #      #
//  #    # #      #
//  #    # ###### ######

exports.getAllEmployee = asyncHandler(async (req, res, next) => {
  // console.log("first log is >>", req.db);
  let employee = await req.db.artist.findAll();
  res.status(200).json({
    success: true,
    data: employee,
  });
});

//  #       #######  #####  ### #     #
//  #       #     # #     #  #  ##    #
//  #       #     # #        #  # #   #
//  #       #     # #  ####  #  #  #  #
//  #       #     # #     #  #  #   # #
//  #       #     # #     #  #  #    ##
//  ####### #######  #####  ### #     #

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Оролтыг шалгана
  if (!email || !password) {
    throw new MyError("Та мэйл болон нэр ээ оруулна уу", 400);
  }

  //Тухайн хэрэглэгчийг хайна
  const employee = await req.db.employee
    .scope("withPassword")
    .findOne({ where: { email: email } });

  // if (user?.status === "9") {
  //   throw new MyError("Таны хэрэглэгчийн эрх хүрэхүй байна", 400);
  // }

  if (!employee) {
    throw new MyError(`Хэрэглэгч олдсонгүй та бүртгэл ээ үүсгэнэ үү`, 400);
  }
  const ok = await employee.checkPassword(password);

  if (!ok) {
    throw new MyError("Нууц үг таарахгүй байна", 401);
  }

  const token = employee.getJsonWebToken();

  // var updateUser = await req.db.user.findByPk(user.id);
  // updateUser.action = "login";
  // await updateUser.save();
  // if (user?.status === "9") {
  //   const shareholder1 = await req.db.shareholder.findOne({
  //     where: { id: shareholder?.id },
  //   });
  //   shareholder1.userId = user.id;
  //   await shareholder1.save();
  // }
  employee.password = "";

  // var cookieOptions = getCookieOptions();

  res.status(200).cookie("token", token).json({
    success: true,
    accessToken: token,
    data: {
      employee,
    },
  });
});

//  ######  #######  #####  ###  #####  ####### ####### ######
//  #     # #       #     #  #  #     #    #    #       #     #
//  #     # #       #        #  #          #    #       #     #
//  ######  #####   #  ####  #   #####     #    #####   ######
//  #   #   #       #     #  #        #    #    #       #   #
//  #    #  #       #     #  #  #     #    #    #       #    #
//  #     # #######  #####  ###  #####     #    ####### #     #

exports.register = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    throw new MyError("Та бүртгэлийн мэдээлэл ээ оруулна уу.", 400); //Та регистрын дугаараа илгээнэ үү.
  }
  const { email } = req.body;
  var exUser = await req.db.employee.findOne({ where: { email: email } });

  if (!exUser) {
    req.body.status = "9";
    var employee = await req.db.employee.create(req.body);
  } else {
    throw new MyError(`${exUser.email} Энэ хэрэглэгч бүртгэлтэй байна.`, 400);
  }

  employee.password = null;
  employee.confirmationToken = null;
  employee.confirmationTokenExpire = null;

  const token = employee.getJsonWebToken();

  res.status(200).json({
    success: true,
    accessToken: token,
    data: {
      employee,
    },
  });
});

//  #       #######  #####  ####### #     # #######
//  #       #     # #     # #     # #     #    #
//  #       #     # #       #     # #     #    #
//  #       #     # #  #### #     # #     #    #
//  #       #     # #     # #     # #     #    #
//  #       #     # #     # #     # #     #    #
//  ####### #######  #####  #######  #####     #

exports.logout = asyncHandler(async (req, res, next) => {
  cookieOption = {
    expires: moment().subtract(2, "h").utc(8).toDate(),
    httpOnly: false,
    secure: true,
    sameSite: "none",
  };

  res.status(200).cookie("token", null, cookieOption).json({
    success: true,
    data: "Logged out",
  });
});
