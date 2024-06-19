//  #     #    #    ### #     #
//  ##   ##   # #    #  ##    #
//  # # # #  #   #   #  # #   #
//  #  #  # #     #  #  #  #  #
//  #     # #######  #  #   # #
//  #     # #     #  #  #    ##
//  #     # #     # ### #     #

const asyncHandler = require("express-async-handler");
const MyError = require("../utils/myError");
const paginate = require("../utils/paginate-sequelize");
const sendEmail = require("../utils/email");
const sendSMS = require("../utils/sms");
const crypto = require("crypto");
const moment = require("moment");
const { now } = require("../utils/moment");
const { Op } = require("sequelize");
// const cookieParser = require("cookie-parser");
// const logger = require("../utils/logger");
// const { frcLogStream, frcErrLogStream } = require("../middlewares/logger");

// var cookieOptions =  {
//     expires: moment().add(2, 'h').utc(8).toDate(),
//     httpOnly: process.env.COOKIE_ENV === 'development' ? true : true,
//     secure: process.env.COOKIE_ENV === 'development' ? false : true,
//     sameSite: 'none',
// }

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

// var cookieOptions = {
//     expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
//     httpOnly: true,
// }

exports.createUser = asyncHandler(async (req, res, next) => {
  req.body.action = "create user";
  //    req.body.createdAt = now()
  //    req.body.updatedAt = now()

  const user = await req.db.user.create(req.body);

  user.password = "";

  res.status(200).json({
    success: true,
    data: user,
  });
});

//   #####  ####### #     # ####### ### ######  #     #
//  #     # #     # ##    # #        #  #     # ##   ##
//  #       #     # # #   # #        #  #     # # # # #
//  #       #     # #  #  # #####    #  ######  #  #  #
//  #       #     # #   # # #        #  #   #   #     #
//  #     # #     # #    ## #        #  #    #  #     #
//   #####  ####### #     # #       ### #     # #     #

exports.confirmByCompany = asyncHandler(async (req, res, next) => {
  if (!req.body.userId || !req.body.companyId) {
    throw new MyError("main_error_shareholder_required", 400); //Хэрэглэгч олдсонгүй
  }

  // console.log("companyid ", req.body.companyid);
  // console.log("userid ", req.body.userid);

  const shareholder = await req.db.shareholder.findOne({
    where: { userId: req.body.userId, companyId: req.body.companyId },
  });

  if (!shareholder) {
    throw new MyError("main_error_shareholder_not_found", 400); //Хэрэглэгч олдсонгүй
  }

  shareholder.confirm = true;
  shareholder.confirmationmethod = "admin";
  shareholder.confirmdate = now();
  // shareholder.confirmdate = moment().format("YYYY-MM-DD hh:mm:ss");
  await shareholder.save();

  // const confirmationNumber = user.generateConfirmationNumber();
  // console.log("CONFIRMATION NUMBER: ", confirmationNumber)

  // var messageMn = `Таны баталгаажуулах дугаар: ${confirmationNumber}. Баталгаажуулах холбоос: ${confirmationLink}`;
  var user = await req.db.user.findByPk(req.body.userId);
  var messageMn = `Agm.mn Таны бүртгэл баталгаажлаа. Баталгаажсан огноо: ${now()}`;
  var messageEn = `Agm.mn Tanii burtgel batalgaajlaa. Batalgaajsan ognoo: ${now()}`;

  // user.action = "confirmByPhone";
  // await user.save();

  // method = "phone";

  if (!user.phone) {
    throw new MyError("main_error_user_no_phone", 400);
  }

  await sendSMS({
    phone: user.phone,
    subject: "Баталгаажуулах",
    messageMn: messageMn,
    messageEn: messageEn,
  });
  res.status(200).json({
    success: true,
    shareholder,
  });
});

//   #####  ####### #     # ####### ### ######  #     # #     #  #####  ####### ######
//  #     # #     # ##    # #        #  #     # ##   ## #     # #     # #       #     #
//  #       #     # # #   # #        #  #     # # # # # #     # #       #       #     #
//  #       #     # #  #  # #####    #  ######  #  #  # #     #  #####  #####   ######
//  #       #     # #   # # #        #  #   #   #     # #     #       # #       #   #
//  #     # #     # #    ## #        #  #    #  #     # #     # #     # #       #    #
//   #####  ####### #     # #       ### #     # #     #  #####   #####  ####### #     #

exports.confirmUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  if (!req.body.token) {
    throw new MyError("main_error_code_required", 400); //хэрэглэгчийн дугаар дамжуулна уу
  }

  const encryptedNumber = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");
  var query = {
    where: {
      confirmationToken: encryptedNumber,
      confirmationTokenExpire: {
        [Op.gt]: moment().utc(8).toDate(),
      },
    },
  };
  console.log(query);
  const user = await req.db.customer.findOne(query);

  if (!user) {
    throw new MyError("main_error_user_token_expired", 400); //Токений хүчинтэй хугацаа дууссан байна. gg
  }

  await user.update({
    confirmationToken: null,
    confirmationTokenExpire: null,
    // action: "confirmUser",
    confirm: true,
    // confirmdate: now(),
  });
  // await shareholder.update({
  //   confirm: true,
  //   confirmdate: now(),
  // });

  // const token = user.getJsonWebToken();

  // var cookieOptions = getCookieOptions();

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});

//   #####  ####### #######  #####  ####### #     # ####### ### ######  #     #
//  #     # #          #    #     # #     # ##    # #        #  #     # ##   ##
//  #       #          #    #       #     # # #   # #        #  #     # # # # #
//  #  #### #####      #    #       #     # #  #  # #####    #  ######  #  #  #
//  #     # #          #    #       #     # #   # # #        #  #   #   #     #
//  #     # #          #    #     # #     # #    ## #        #  #    #  #     #
//   #####  #######    #     #####  ####### #     # #       ### #     # #     #

exports.getConfirmUser = asyncHandler(async (req, res, next) => {
  // let method;

  if (req.body.type === "email") {
    var user = await req.db.customer.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      throw new MyError("main_error_user_not_found", 400); //Хэрэглэгч олдсонгүй
    }
    //const confirmationToken = user.generateConfirmationToken()
    //const confirmationLink = `${process.env.FRONTEND}/confirmation?token=${confirmationToken}`
    const confirmationNumber = user.generateConfirmationNumber();
    const confirmationLink = `${process.env.FRONTEND}/confirm?token=${confirmationNumber}`; /* <br><a href="${confirmationLink}">Баталгаажуулах холбоос</a> */

    var message = `Сайн байна уу? <br><br>Zu Nailbar -д бүртгэлээ баталгаажуулах хүсэлт илгээлээ. <br> Дараах линкээр бүртгэлээ баталгаажуулаарай: <br><br> <b><a href="${confirmationLink}">Баталгаажуулах линк</a></b><br><br>Өдрийг сайхан өнгөрүүлээрэй.`;

    // user.ip = await public_ip.v4()
    // user.updatedAt = now()
    // console.log(message)

    // user.action = "confirmByEmail";
    await user.save();

    // method = "email";

    await sendEmail({
      email: user.email,
      from: "Zu Nailbar бүртгэлээ баталгаажуулах хүсэлт",
      subject: "Баталгаажуулах",
      html: message,
    });
  }

  res.status(200).json({
    success: true,
    data: {
      user,
      // shareholder,
    },
  });
});

//  ######  ####### #     # ####### #     #  #####  ####### #     # ####### ### ######  #     #
//  #     # #       ##    # #       #  #  # #     # #     # ##    # #        #  #     # ##   ##
//  #     # #       # #   # #       #  #  # #       #     # # #   # #        #  #     # # # # #
//  ######  #####   #  #  # #####   #  #  # #       #     # #  #  # #####    #  ######  #  #  #
//  #   #   #       #   # # #       #  #  # #       #     # #   # # #        #  #   #   #     #
//  #    #  #       #    ## #       #  #  # #     # #     # #    ## #        #  #    #  #     #
//  #     # ####### #     # #######  ## ##   #####  ####### #     # #       ### #     # #     #

exports.renewConfirmToken = asyncHandler(async (req, res, next) => {
  // // console.log("REQ PARAM: ", req.params.id)
  // // console.log("REQ ID: ", req.userId)
  var user = await req.db.user.findByPk(req.params.id);

  if (!user) {
    throw new MyError("main_error_user_required", 400);
  }

  const confirmationToken = user.generateConfirmationToken();

  user.action = "renewConfirmToken";

  await user.save();

  const confirmationLink = `${process.env.FRONTEND}/confirmation?token=${confirmationToken}`;

  const message = `Сайн байна уу? <br><br>Та хувьцаа эзэмшигчдийн хуралд онлайнаар оролцох хүсэлт илгээлээ. <br> Дараах холбоосоор хандан бүртгэлээ баталгаажуулаарай: <br><br> <a href="${confirmationLink}">Баталгаажуулах</a><br><br>Хэрэв та хүсэлт илгээгээгүй бол яаралтай 75551919 дугаарт холбогдон мэдэгдэнэ үү.<br><br>Өдрийг сайхан өнгөрүүлээрэй.`;

  await sendEmail({
    email: user.email,
    subject: "Баталгаажуулах",
    html: message,
  });

  res.status(200).json({
    success: true,
    data: "Та мэйл хаягаа шалгана уу.",
  });
});

//   #####  ####### #     # ####### ### ######  #     #
//  #     # #     # ##    # #        #  #     # ##   ##
//  #       #     # # #   # #        #  #     # # # # #
//  #       #     # #  #  # #####    #  ######  #  #  #
//  #       #     # #   # # #        #  #   #   #     #
//  #     # #     # #    ## #        #  #    #  #     #
//   #####  ####### #     # #       ### #     # #     #

exports.checkConfirmation = asyncHandler(async (req, res, next) => {
  const shareholder = await req.db.shareholder.findOne({
    where: { userId: req.body.userId, companyId: req.body.companyId },
  });

  if (!shareholder?.confirm) {
    throw new MyError("main_error_user_conform_required", 400);
  }

  res.status(200).json({
    success: true,
    // data: shareholder,
  });
});

exports.confirmToken = asyncHandler(async (req, res, next) => {
  if (!req.query.token) {
    throw new MyError("main_error_confirm_token_not_found", 400);
  }

  // console.log('BATALGAAJULAH HOLBOOSTOI ')

  const encryptedToken = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex");

  // // console.log('BATALGAAJULAH HOLBOOSTOI: ', encryptedToken)

  const user = await req.db.user.findOne({
    where: {
      confirmationToken: encryptedToken,
      confirmationTokenExpire: {
        [Op.gt]: moment().utc(8).toDate(),
      },
    },
  });

  if (!user) {
    throw new MyError("main_error_user_token_expired.", 400);
  }

  user.confirmationToken = null;
  user.confirmationTokenExpire = null;
  user.confirm = true;
  user.action = "confirmToken";
  //    user.updatedAt = now()

  user.save();

  const token = user.getJsonWebToken();

  var cookieOptions = getCookieOptions();

  res.status(200).cookie("token", token, cookieOptions).json({
    success: true,
    // token,
    user,
  });
});

//  #     # ######  ######     #    ####### #######
//  #     # #     # #     #   # #      #    #
//  #     # #     # #     #  #   #     #    #
//  #     # ######  #     # #     #    #    #####
//  #     # #       #     # #######    #    #
//  #     # #       #     # #     #    #    #
//   #####  #       ######  #     #    #    #######

exports.updateUser = asyncHandler(async (req, res, next) => {
  // req.body.action = "update user";
  // req.body.ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  // console.log(req.body);
  if (req.body.password === "") {
    delete req.body.password;
  }
  let customer = await req.db.customer.findByPk(req.params.id);

  if (!customer) {
    throw new MyError(`main_error_user_not_found`, 400);
  }

  customer = await customer.update(req.body);
  customer.password = "";
  customer.salt = "";

  res.status(200).json({
    success: true,
    data: customer,
  });
});

//  ######  #######  #####  ####### ######  ####### #     #
//  #     # #       #     #    #    #     # #     #  #   #
//  #     # #       #          #    #     # #     #   # #
//  #     # #####    #####     #    ######  #     #    #
//  #     # #             #    #    #   #   #     #    #
//  #     # #       #     #    #    #    #  #     #    #
//  ######  #######  #####     #    #     # #######    #

exports.destroyUser = asyncHandler(async (req, res, next) => {
  let customer = await req.db.customer.findByPk(req.params.id);

  if (!customer) {
    throw new MyError(`main_error_user_not_found`, 400);
  }
  // customer.destroy()
  deletedCustomer = await req.db.customer.destroy({
    where: { id: req.params.id },
  });

  res.status(200).json({
    success: true,
    data: deletedCustomer,
  });
});

//   #####  ####### #######
//  #     # #          #
//  #       #          #
//  #  #### #####      #
//  #     # #          #
//  #     # #          #
//   #####  #######    #

exports.getUser = asyncHandler(async (req, res, next) => {
  // // console.log(req.params.id)
  // // console.log(req.db)

  let user = await req.db.user.findByPk(req.params.id);
  // // console.log(user)
  if (!user) {
    // // console.log('i am here')
    throw new MyError(`main_error_user_not_found`, 400);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

//    ##   #      #          ####   ####  #    # #    # ###### #    # #####  ####
//   #  #  #      #         #    # #    # ##  ## ##  ## #      ##   #   #   #
//  #    # #      #         #      #    # # ## # # ## # #####  # #  #   #    ####
//  ###### #      #         #      #    # #    # #    # #      #  # #   #        #
//  #    # #      #         #    # #    # #    # #    # #      #   ##   #   #    #
//  #    # ###### ######     ####   ####  #    # #    # ###### #    #   #    ####

exports.getAllUser = asyncHandler(async (req, res, next) => {
  let customers = await req.db.customer.findAll();

  res.status(200).json({
    success: true,
    data: customers,
  });
});
// end
//  #       #######  #####  ### #     #
//  #       #     # #     #  #  ##    #
//  #       #     # #        #  # #   #
//  #       #     # #  ####  #  #  #  #
//  #       #     # #     #  #  #   # #
//  #       #     # #     #  #  #    ##
//  ####### #######  #####  ### #     #

exports.login = asyncHandler(async (req, res, next) => {
  console.log("req.body", req.body);
  const { email, password } = req.body;

  // Оролтыг шалгана
  if (!email || !password) {
    throw new MyError("Та мэйл болон нэр ээ оруулна уу", 400);
  }

  //Тухайн хэрэглэгчийг хайна
  const customer = await req.db.customer
    .scope("withPassword")
    .findOne({ where: { email: email } });

  if (!customer) {
    throw new MyError(`Хэрэглэгч олдсонгүй та бүртгэл ээ үүсгэнэ үү`, 400);
  }
  const ok = await customer.checkPassword(password);

  if (!ok) {
    throw new MyError("Нууц үг таарахгүй байна", 401);
  }
  if (!customer.confirm) {
    throw new MyError("customer_confirm_error", 401);
  }
  const token = customer.getJsonWebToken();
  customer.password = "";

  res.status(200).cookie("token", token).json({
    success: true,
    accessToken: token,
    data: {
      customer,
    },
  });
});

exports.rateArtist = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  var rating = await req.db.artist_rating.create(req.body.values);

  res.status(200).json({
    success: true,
    data: rating,
  });
});

//   #####  ####### #     # #     # ###  #####   #####  ### ####### #     #
//  #     # #     # ##   ## ##   ##  #  #     # #     #  #  #     # ##    #
//  #       #     # # # # # # # # #  #  #       #        #  #     # # #   #
//  #       #     # #  #  # #  #  #  #   #####   #####   #  #     # #  #  #
//  #       #     # #     # #     #  #        #       #  #  #     # #   # #
//  #     # #     # #     # #     #  #  #     # #     #  #  #     # #    ##
//   #####  ####### #     # #     # ###  #####   #####  ### ####### #     #

exports.registerByCommission = asyncHandler(async (req, res, next) => {
  if (!req.body.register) {
    throw new MyError("main_error_user_register_not_found", 400); //Та регистрын дугаараа илгээнэ үү.
  }

  const shareholders = await req.db.shareholder.findAll({
    attributes: [
      "id",
      "lastname",
      "firstname",
      "register",
      "amount",
      "voted",
      "userId",
      "companyId",
      "createdAt",
      "updatedAt",
    ],
    where: {
      register: req.body.register,
    },
  });

  req.body.status = "9";

  if (shareholders.length === 0) {
    throw new MyError("main_error_shareholder_register_not_found", 400);
    //Регистрын дугаарт харгалзах тархалтын мэдээлэл олдсонгүй
  }

  try {
    for (let i = 0; i < shareholders.length; i++) {
      if (shareholders[i].userId) {
        throw new MyError(
          `${shareholders[i].register} тархалтын мэдээлэлд хэрэглэгч бүртгүүлсэн байна.`,
          400
        );
      }
    }
  } catch (e) {
    throw new MyError(e, 400);
  }

  //    req.body.createdAt = now()
  req.body.action = "registerByCommission";

  var user = await req.db.user.create(req.body);

  try {
    for (let i = 0; i < shareholders.length; i++) {
      shareholders[i].userId = user.id;
      await shareholders[i].save();
    }
  } catch (e) {
    throw new MyError(e, 400);
  }

  res.status(200).json({
    success: true,
    user,
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
  var exCustomer = await req.db.customer.findOne({ where: { email: email } });

  if (!exCustomer) {
    req.body.status = "9";
    var customer = await req.db.customer.create(req.body);
  } else {
    throw new MyError(
      `${exCustomer.email} Энэ хэрэглэгч бүртгэлтэй байна.`,
      400
    );
  }

  customer.password = null;
  customer.confirmationToken = null;
  customer.confirmationTokenExpire = null;

  const token = customer.getJsonWebToken();

  res.status(200).json({
    success: true,
    accessToken: token,
    // data: {
    //   user,
    // },
  });
});
exports.registerByAdmin = asyncHandler(async (req, res, next) => {
  // console.log("$:/user/register/body ", req.body);
  // console.log("register", req.body.register);
  if (!req.body.register) {
    throw new MyError("main_error_user_register_not_found", 400); //Та регистрын дугаараа илгээнэ үү.
  }
  const shareholder = await req.db.shareholder.findOne({
    where: {
      register: req.body.register,
      companyId: req.body.companyId,
    },
  });
  const company = await req.db.company.findByPk(req.body.companyId);
  if (!company.endMeeting) {
    // throw new MyError("main_error_company_meeting_ended", 400);
  } else {
    throw new MyError("main_error_company_meeting_ended", 400);
  }
  if (!shareholder) {
    // console.log("$:/register ", shareholder);

    throw new MyError("main_error_shareholder_register_not_found", 400);
    //Регистрын дугаарт харгалзах тархалтын мэдээлэл олдсонгүй
  }

  var exUser = await req.db.user.findByPk(shareholder.userId);

  if (!exUser) {
    try {
      req.body.action = "register";
      req.body.status = "9";

      var user = await req.db.user.create(req.body);
      shareholder.userId = user.id;
      if (shareholder.confirm === null && shareholder.confirmdate === null) {
        shareholder.confirm = true;
        shareholder.confirmationmethod = "admin";
        shareholder.confirmdate = now();
      }
      await shareholder.save();
      const resetToken = user.generatePasswordChangeToken();
      user.updatedAt = now();

      user.action = "registerByAdmin";
      await user.save();

      const link = `${process.env.FRONTEND}/auth/change-password?token=${resetToken}`;

      const message = `Сайн байна уу?<br><br>Таны бүртгэл амжилттай хийгдлээ.<br>Нууц үгээ доорх холбоосоор хандан нууц үгээ үүсгэнэ үү?: <br><br><a href="${link}">Нууц үг үүсгэх</a><br><br>Өдрийг сайхан өнгөрүүлээрэй. <span>agm.mn</span>`;

      // console.log("MESSAGE: ", message);

      await sendEmail({
        email: user.email,
        subject: "Нууц үг өөрчлөх хүсэлт",
        html: message,
        from: "БиДиСЕК ҮЦК ХК",
      });

      try {
        // const linksms = `${process.env.FRONTEND}/auth/change-password?token=${resetToken}`;

        var messageMn2 = `agm.mn Таны нэвтрэх мэйл хаяг: ${user.email}.`;
        var messageEn2 = `agm.mn Tanii nevtreh E-mail hayg: ${user.email}`;

        var messageMn = `agm.mn Нууц үг үүсгэх линк: ${link}.`;
        var messageEn = `agm.mn Nuuts ug uusgeh link: ${link}`;
        await sendSMS({
          phone: user.phone,
          subject: "Баталгаажуулах",
          messageMn: messageMn2,
          messageEn: messageEn2,
        });
        await sendSMS({
          phone: user.phone,
          subject: "Баталгаажуулах",
          messageMn: messageMn,
          messageEn: messageEn,
        });
      } catch (err) {
        user.send = "1";
        await user.save();
        throw new MyError(
          `Таны бүртгэл амжилттай үүссэн, мсж болон и - мэйл илгээхэд алдаа гарлаа`,
          400
        );
      }
    } catch (e) {
      throw new MyError(e, 400);
    }
  } else {
    if (exUser.phone === "E-mongolia") {
      throw new MyError(`Та e-mongolia -аар бүртгүүлсэн байна`, 400);
    } else
      throw new MyError(
        `${exUser.email} тархалтын мэдээлэлд бүртгүүлсэн байна`,
        400
      );
  }

  user.password = null;
  user.confirmationToken = null;
  user.confirmationTokenExpire = null;

  res.status(200).json({
    success: true,
    shareholder,
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
  var cookieOption = {
    expires: moment().subtract(2, "h").utc(8).toDate(),
    httpOnly: false,
    secure: true,
    sameSite: "none",
  };
  // const shareholder = await req.db.shareholder.findOne({
  //   where: {
  //     register: req.body.register,
  //     companyId: req.body.companyId,
  //   },
  // });
  // console.log(req.db.shareholder);
  // cookieOption = {
  //     expires: new Date(Date.now - 1000),
  //     httpOnly: true,
  //     secure: false,
  // }

  // res.status(200).json({
  //   success: true,
  //   data: shareholder,
  // });
  req.session.destroy();

  // console.log("Хэрэглэгч системээс гарлаа");

  res.status(200).cookie("token", null, cookieOption).json({
    success: true,
    data: "Logged out",
  });
});

//  ####### ####### ######   #####  ####### #######
//  #       #     # #     # #     # #     #    #
//  #       #     # #     # #       #     #    #
//  #####   #     # ######  #  #### #     #    #
//  #       #     # #   #   #     # #     #    #
//  #       #     # #    #  #     # #     #    #
//  #       ####### #     #  #####  #######    #

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // console.log(req.body.email, req.body.type);
  if (!req.body.email) {
    throw new MyError("main_error_user_forgotPassword", 400); //Та нууц үг сэргээх и-мэйл хаягаа оруулна уу?
  }

  const user = await req.db.user.findOne({ where: { email: req.body.email } });

  if (!user) {
    // throw new MyError(`${req.body.email}-д харгалзах хэрэглэгч олдсонгүй`);
    // throw new MyError(`Э-майлд харгалзах хэрэглэгч олдсонгүй`);
    throw new MyError(`main_error_forgotPass_user_not_found`);
  }
  // TYPE EMAIL
  if (req.body.type === "email") {
    const resetToken = user.generatePasswordChangeToken();
    user.updatedAt = now();
    // console.log("resetToken: ", resetToken);

    // console.log("USER: ", user);

    user.action = "forgotPasswordByEmail";
    await user.save();

    const link = `${process.env.FRONTEND}/auth/change-password?token=${resetToken}`;

    const message = `Сайн байна уу?<br><br>Та нууц үгээ солих хүсэлт илгээлээ. <br>Нууц үгээ доорх холбоосоор хандан засварлана уу: <br><br> <a href="${link}">Нууц үг сэргээх</a><br><br>Өдрийг сайхан өнгөрүүлээрэй.`;

    // console.log("MESSAGE: ", message);

    await sendEmail({
      email: user.email,
      subject: "Нууц үг өөрчлөх хүсэлт",
      html: message,
      from: "БиДиСЕК ҮЦК ХК",
    });
  }
  // TYPE PHONE
  else if (req.body.type === "phone") {
    if (!user.phone) {
      throw new MyError("main_error_user_no_phone", 400);
    }

    const resetToken = user.generatePasswordChangeToken();
    //    user.updatedAt = now()
    // console.log("resetToken: ", resetToken);

    // console.log("USER: ", user);

    user.action = "forgotPasswordByPhone";
    await user.save();

    // console.log("USER: ");

    const link = `${process.env.FRONTEND}/auth/change-password?token=${resetToken}`;

    var messageMn = `agm.mn Нууц үг солих линк: ${link}.`;
    var messageEn = `agm.mn Nuuts ug solih link: ${link}`;

    // var messageMn = `Сайн байна уу?<br><br>Та agm.bdsec.mn -ний нууц үг солих хүсэлт илгээлээ. <br>Таний нууц үг солих код: <br><br> ${resetToken}`;
    // var messageEn = `Sain baina uu?<br><br>Ta agm.bdsec.mn -nii nuuts ug sergeeh huselt ilgeelee. <br>Tanii nuuts ug solih kod: <br><br> ${resetToken}`;

    // console.log("MESSAGE: ", messageMn);
    method = "phone";

    await sendSMS({
      phone: user.phone,
      subject: "Баталгаажуулах",
      messageMn: messageMn,
      messageEn: messageEn,
    });
  }

  res.status(200).json({
    success: true,
    // resetToken,
  });
});

//  ######  #######  #####  ####### #######
//  #     # #       #     # #          #
//  #     # #       #       #          #
//  ######  #####    #####  #####      #
//  #   #   #             # #          #
//  #    #  #       #     # #          #
//  #     # #######  #####  #######    #

exports.resetPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.resetToken || !req.body.password) {
    throw new MyError("main_error_user_resetPassword_token_password", 400); //Та токен болон нууц үг ээ илгээнэ үү
  }

  const encryptedPassword = crypto
    .createHash("sha256")
    .update(req.body.resetToken)
    .digest("hex");

  const user = await req.db.user.findOne({
    where: {
      resetPasswordToken: encryptedPassword,
      resetPasswordExpire: {
        [Op.gt]: moment().utc(8).toDate(),
      },
    },
  });

  if (!user) {
    throw new MyError("main_error_user_resetPassword_token", 400); //Токен хүчингүй байна
  }

  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  //    user.updatedAt = now()

  user.action = "resetPassword";
  user.save();

  const token = user.getJsonWebToken();

  var cookieOptions = getCookieOptions();

  res.status(200).cookie("token", token, cookieOptions).json({
    success: true,
    // token,
  });
});

//   #####  #     #    #    ######  ####### #     # ####### #       ######  ####### ######
//  #     # #     #   # #   #     # #       #     # #     # #       #     # #       #     #
//  #       #     #  #   #  #     # #       #     # #     # #       #     # #       #     #
//   #####  ####### #     # ######  #####   ####### #     # #       #     # #####   ######
//        # #     # ####### #   #   #       #     # #     # #       #     # #       #   #
//  #     # #     # #     # #    #  #       #     # #     # #       #     # #       #    #
//   #####  #     # #     # #     # ####### #     # ####### ####### ######  ####### #     #

exports.AllBookingsByCustomerId = asyncHandler(async (req, res, next) => {
  const booking = await req.db.booking.findAll({
    where: {
      customerId: req.params.id,
    },
  });

  if (!booking) {
    throw new MyError(`${req.params.id} ID тэй хэрэглэгч олдсонгүй`, 400);
  }

  res.status(200).json({
    pk: req.params.id,
    success: true,
    data: booking,
  });
});

exports.userCompany = asyncHandler(async (req, res, next) => {
  const user = await req.db.user.findByPk(req.userId);

  if (!user) {
    throw new MyError(`${req.params.id} ID тэй хэрэглэгч олдсонгүй`, 400);
  }

  let companies;

  if (user.status === "0") {
    companies = await req.db.company.findAll();
  } else {
    companies = await user.getCompanies();
  }

  if (companies.length === 0) {
    throw new MyError("main_error_companies_information_not_found", 400);
  }

  res.status(200).json({
    success: true,
    data: companies,
  });
});

//  ######  #######  #####  ####### ######  ####### #     #    #     # ####### ####### #######
//  #     # #       #     #    #    #     # #     #  #   #     #     # #     #    #    #
//  #     # #       #          #    #     # #     #   # #      #     # #     #    #    #
//  #     # #####    #####     #    ######  #     #    #       #     # #     #    #    #####
//  #     # #             #    #    #   #   #     #    #        #   #  #     #    #    #
//  #     # #       #     #    #    #    #  #     #    #         # #   #     #    #    #
//  ######  #######  #####     #    #     # #######    #          #    #######    #    #######

exports.destroyVote = asyncHandler(async (req, res, next) => {
  // console.log(req.params);d

  const user = await req.db.user.findByPk(req.params.userId);

  if (!user) {
    throw new MyError(`${req.params.userId} хувьцаа эзэмшигч олдсонгүй`, 400);
  }

  const company = await req.db.company.findByPk(req.params.companyId);

  if (!company) {
    throw new MyError(`${req.params.companyId} компани олдсонгүй`, 400);
  }

  var company_discussions = await req.db.discussion.findAll({
    where: { companyId: company.id },
  });
  var company_bods = await req.db.bod.findAll({
    where: { companyId: company.id },
  });

  try {
    if (company_discussions.length > 0) {
      company_discussions.forEach(async (disc) => {
        // console.log("DESTROING: ", disc.id + " " + user.id);
        await req.db.discussion_vote.destroy({
          where: { userId: user.id, discussionId: disc.id },
        });
      });
    }

    if (company_bods.length > 0) {
      company_bods.forEach(async (bod) => {
        // console.log("DESTROING: ", bod.id + " " + user.id);
        await req.db.bod_vote.destroy({
          where: { userId: user.id, bodId: bod.id },
        });
      });
    }
  } catch (err) {
    throw new MyError(err + " устгахад алдаа гарлаа", 400);
  }

  try {
    var shareholder = await req.db.shareholder.findOne({
      where: {
        userId: user.id,
        companyId: company.id,
      },
    });
    shareholder.voted = null;
    shareholder.save();
  } catch (err) {
    throw new MyError(err + " алдаа гарлаа", 400);
  }

  user.action = "destroyVote";
  user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getRatingByCustomerId = asyncHandler(async (req, res, next) => {
  const rating = await req.db.artist_rating.findAll({
    where: {
      customerId: req.params.id,
    },
  });

  if (!rating) {
    throw new MyError(`${req.params.id} ID тэй хэрэглэгч олдсонгүй`, 400);
  }

  res.status(200).json({
    pk: req.params.id,
    success: true,
    data: rating,
  });
});
