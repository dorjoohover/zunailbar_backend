const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/email");
const { Op } = require("sequelize");
const sendSMS = require("../utils/sms");

//   #####  ####### #     # ######  #     #    #    ### #
//  #     # #       ##    # #     # ##   ##   # #    #  #
//  #       #       # #   # #     # # # # #  #   #   #  #
//   #####  #####   #  #  # #     # #  #  # #     #  #  #
//        # #       #   # # #     # #     # #######  #  #
//  #     # #       #    ## #     # #     # #     #  #  #
//   #####  ####### #     # ######  #     # #     # ### #######

exports.sendEmailReq = asyncHandler(async (req, res, next) => {
  await sendEmail({
    email: req.body.to,
    subject: req.body.subject,
    from: req.body.from,
    html: req.body.message,
  });

  res.status(200).json({
    success: true,
    data: "Та мэйл хаягаа шалгана уу.",
  });
});

//   #####  ####### #     # ######     #    #     # #     #
//  #     # #     # ##   ## #     #   # #   ##    #  #   #
//  #       #     # # # # # #     #  #   #  # #   #   # #
//  #       #     # #  #  # ######  #     # #  #  #    #
//  #       #     # #     # #       ####### #   # #    #
//  #     # #     # #     # #       #     # #    ##    #
//   #####  ####### #     # #       #     # #     #    #

exports.sendMailToCompany = asyncHandler(async (req, res, next) => {
  var company = await req.db.company.findByPk(req.body.companyId, {
    group: ["id", "shareholders.id"],
    attributes: ["id", "name"],
    include: [
      {
        model: req.db.shareholder,
        attributes: ["id"],
        include: {
          model: req.db.user,
          attributes: ["id", "email"],
        },
        where: {
          userId: {
            [Op.ne]: null,
          },
        },
      },
    ],
  });

  if (!company) {
    throw new MyError("main_error_not_found_company", 400); //Компани олдсонгүй
  }

  try {
    company.shareholders.forEach(async (shareholder) => {
      await sendEmail({
        email: shareholder.user.email,
        subject: req.body.subject,
        from: req.body.from,
        html: req.body.message,
      });
    });
  } catch (e) {
    throw new MyError(`Мэйл илгээхэд алдаа гарлаа: ${e} `, 400);
  }

  res.status(200).json({
    success: true,
    data: company,
  });
});


exports.sendSms = asyncHandler(async (req, res, next) => {

    console.log("$:/sms", req.body);

    var sms = await sendSMS({
        phone: req.body.phone,
        subject: req.body.subject,
        messageMn: req.body.messagemn,
        messageEn: req.body.messageen,
    });

    res.sendStatus(200).json({
        success: true,
        data: sms
    });
})