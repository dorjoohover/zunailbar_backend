const MyError = require("../utils/myError");
const axios = require("axios");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const moment = require("moment");

const { frcLogStream, frcErrLogStream } = require("../middlewares/logger");

//   #####  ####### #     # ######     #    #     # #     #
//  #     # #     # ##   ## #     #   # #   ##    #  #   #
//  #       #     # # # # # #     #  #   #  # #   #   # #
//  #       #     # #  #  # ######  #     # #  #  #    #
//  #       #     # #     # #       ####### #   # #    #
//  #     # #     # #     # #       #     # #    ##    #
//   #####  ####### #     # #       #     # #     #    #

exports.company = asyncHandler(async (req, res, next) => {
  const company = await req.db.company.findByPk(req.params.id);

  if (!company) {
    throw new MyError("main_error_not_found_company", 400); //Компани олдсонгүй
  }

  var discussion = await req.db.discussion.findAndCountAll({
    where: { companyId: company.id },
  });

  var confirm = await req.db.company.findByPk(req.params.id, {
    group: ["id"],
    attributes: [
      [
        req.db.sequelize.fn("SUM", req.db.sequelize.col("shareholders.amount")),
        "shares",
      ],
      [
        req.db.sequelize.fn("COUNT", req.db.sequelize.col("shareholders.id")),
        "shareholder",
      ],
    ],
    include: [
      {
        model: req.db.shareholder,
        attributes: [],
        include: {
          model: req.db.user,
          attributes: [],
          where: {
            confirm: {
              [Op.ne]: null,
            },
          },
        },
      },
    ],
  });

  var amount = await req.db.company.findByPk(req.params.id, {
    group: ["id"],
    attributes: [
      [
        req.db.sequelize.fn("SUM", req.db.sequelize.col("shareholders.amount")),
        "shares",
      ],
      [
        req.db.sequelize.fn("COUNT", req.db.sequelize.col("shareholders.id")),
        "shareholder",
      ],
    ],
    include: [
      {
        model: req.db.shareholder,
        attributes: [],
      },
    ],
  });

  var pocket = await req.db.company.findByPk(req.params.id, {
    group: ["id"],
    attributes: [
      [
        req.db.sequelize.fn("SUM", req.db.sequelize.col("shareholders.amount")),
        "shares",
      ],
      [
        req.db.sequelize.fn("COUNT", req.db.sequelize.col("shareholders.id")),
        "shareholder",
      ],
    ],
    include: [
      {
        model: req.db.shareholder,
        attributes: [],
        where: {
          type: 0,
        },
      },
    ],
  });

  console.log("POCKET ", pocket);

  await axiosMultiple(process.env.FRC_URL + "/comgeninfo", [
    {
      reg_id: company.register,
      name: company.name,
      announced_date: `${new Date(company.protocolDate).getFullYear()}-${
        new Date(company.protocolDate).getMonth() + 1
      }-${new Date(company.protocolDate).getDay()}`,
      meeting_date: `${new Date(company.meetingDate).getFullYear()}-${
        new Date(company.meetingDate).getMonth() + 1
      }-${new Date(company.meetingDate).getDay()}`,
      announced_topics: discussion.count,
      meeting_topics: discussion.count,
      total_shareholder: amount.dataValues.shareholder,
      quorum_shareholder: parseInt(confirm.dataValues.shareholder) || 0, // int
      pocket_shareholder: parseInt(pocket.dataValues.shareholder) || 0,
      total_share: parseInt(amount.dataValues.shares) || 0,
      pocket_share: parseInt(pocket.dataValues.shares) || 0,
      quorum_share: parseInt(confirm.dataValues.shares) || 0, // int
      system_id: parseInt(process.env.FRC_REGISTERED) || 0,
    },
  ]).then(() => {
    res.status(200).json({ status: true });
  });

  // await axios.post(process.env.FRC_URL + '/comgeninfo', {
  //     reg_id: company.register,
  //     name: company.name,
  //     announced_date: company.protocolDate,
  //     meeting_date: company.meetingDate,
  //     announced_topics: discussion.count,
  //     meeting_topics: discussion.count,
  //     total_shareholder: amount.dataValues.shareholder,
  //     quorum_shareholder: parseInt(confirm.dataValues.shares) * 100 / parseInt(amount.dataValues.shares),
  //     total_share: parseInt(amount.dataValues.shares),
  //     quorum_share: parseInt(confirm.dataValues.shareholder) * 100 / parseInt(amount.dataValues.shareholder),
  //     system_id: process.env.FRC_REGISTERED,
  // }).then((resp) => {

  //     console.log("RESP IS HERE: ", resp)

  //     res.status(200).json({
  //         status: true,
  //         data: {
  //             reg_id: company.register,
  //             name: company.name,
  //             announced_date: company.protocolDate,
  //             meeting_date: company.meetingDate,
  //             announced_topics: discussion.count,
  //             meeting_topics: discussion.count,
  //             total_shareholder: amount.dataValues.shareholder,
  //             quorum_shareholder: parseInt(confirm.dataValues.shares) * 100 / parseInt(amount.dataValues.shares),
  //             total_share: parseInt(amount.dataValues.shares),
  //             quorum_share: parseInt(confirm.dataValues.shareholder) * 100 / parseInt(amount.dataValues.shareholder),
  //             system_id: process.env.FRC_REGISTERED,
  //         }
  //     })
  // })
});

//     #    ####### ####### ####### #     # ######     #    #     #  #####  #######
//    # #      #       #    #       ##    # #     #   # #   ##    # #     # #
//   #   #     #       #    #       # #   # #     #  #   #  # #   # #       #
//  #     #    #       #    #####   #  #  # #     # #     # #  #  # #       #####
//  #######    #       #    #       #   # # #     # ####### #   # # #       #
//  #     #    #       #    #       #    ## #     # #     # #    ## #     # #
//  #     #    #       #    ####### #     # ######  #     # #     #  #####  #######

exports.attendance = asyncHandler(async (req, res, next) => {
  const company = await req.db.company.findByPk(req.params.id);

  if (!company) {
    throw new MyError("main_error_not_found_company", 400); //Компани олдсонгүй
  }

  var shareholders = await req.db.shareholder.findAndCountAll({
    where: {
      companyId: company.id,
    },
    include: {
      model: req.db.user,
      confirm: {
        [Op.ne]: null,
      },
      required: true,
    },
  });

  var shareholders_data = [];

  shareholders.rows.forEach((shareholder) => {
    shareholders_data.push({
      reg_id: company.register,
      shareholder_register: shareholder.register,
      shareholder_firstname: shareholder.firstname,
      shareholder_lastname: shareholder.lastname,
      total_share: shareholder.amount,
      shareholder_email: shareholder.user.email,
      shareholder_phone: shareholder.user.phone,
      ip_address: shareholder.user.ip,
    });
  });

  await axiosMultiple(process.env.FRC_URL + "/quorum", shareholders_data).then(
    () => {
      res.status(200).json({ status: true });
    }
  );

  // shareholders_data.forEach(async (shareholder_data) => {
  //     console.log("SENDING: ", shareholder_data)
  //     await axios.post(process.env.FRC_URL + '/quorum', shareholder_data).then((resp) => {
  //         console.log("ATTENDANCE POST RESP: ", resp.data.result)
  //     })
  // })

  // res.status(200).json(shareholders_data)
});

//  #     # ####### ####### #######
//  #     # #     #    #    #
//  #     # #     #    #    #
//  #     # #     #    #    #####
//   #   #  #     #    #    #
//    # #   #     #    #    #
//     #    #######    #    #######

exports.vote = asyncHandler(async (req, res, next) => {
  const company = await req.db.company.findByPk(req.params.id);

  if (!company) {
    throw new MyError("main_error_not_found_company", 400); //Компани олдсонгүй
  }

  var discussions = await req.db.discussion.findAll({
    where: { companyId: company.id },
    include: {
      model: req.db.discussion_vote,
      include: {
        model: req.db.user,
        include: {
          model: req.db.shareholder,
          limit: 1,
        },
      },
    },
  });

  var bods = await req.db.bod.findAll({
    where: { companyId: company.id },
    include: {
      model: req.db.bod_vote,
      include: {
        model: req.db.user,
        include: {
          model: req.db.shareholder,
          limit: 1,
        },
      },
    },
  });

  var vote_data = [];

  discussions.forEach(async (discussion) => {
    await discussion.discussion_votes.forEach((discussion_vote) => {
      vote_data.push({
        reg_id: company.register,
        topic_id: discussion.id,
        topic_name: discussion.question,
        shareholder_register: discussion_vote.user.shareholders[0].register,
        shareholder_firstname: discussion_vote.user.shareholders[0].firstname,
        shareholder_lastname: discussion_vote.user.shareholders[0].lastname,
        total_share: discussion_vote.user.shareholders[0].amount,
        shareholder_email: discussion_vote.user.email,
        shareholder_phone: discussion_vote.user.phone,
        vote: discussion_vote.accept ? 1 : discussion_vote.declined ? 3 : 2,
        ip_address: discussion_vote.user.ip,
      });
    });
  });

  bods.forEach(async (bod) => {
    await bod.bod_votes.forEach((bod_vote) => {
      vote_data.push({
        reg_id: company.register,
        topic_id: bod.id,
        topic_name: bod.name,
        shareholder_register: bod_vote.user.shareholders[0].register,
        shareholder_firstname: bod_vote.user.shareholders[0].firstname,
        shareholder_lastname: bod_vote.user.shareholders[0].lastname,
        total_share: bod_vote.user.shareholders[0].amount,
        shareholder_email: bod_vote.user.email,
        shareholder_phone: bod_vote.user.phone,
        vote: bod_vote.amount ? 1 : 2,
        ip_address: bod_vote.user.ip,
      });
    });
  });

  // console.log("VOTE DATA IS HERE: ", vote_data)

  await axiosMultiple(process.env.FRC_URL + "/vote", vote_data).then(() => {
    res.status(200).json({ status: true });
  });

  // vote_data.forEach(async (vote) => {
  //     console.log("SENDING: ", vote)
  //     await axios.post(process.env.FRC_URL + '/quorum', vote).then((resp) => {
  //         console.log("VOTE POST RESP: ", resp.data.result)
  //     })
  // })

  // res.status(200).json({
  //     vote_data
  // })
});

//  ####### #######  #####  #######
//     #    #       #     #    #
//     #    #       #          #
//     #    #####    #####     #
//     #    #             #    #
//     #    #       #     #    #
//     #    #######  #####     #

exports.voteTest = asyncHandler(async (req, res, next) => {
  console.log("RES IS HERE: ", req.body);

  res.status(200).json({
    status: true,
  });
});

const axiosMultiple = async (url, data) => {
  try {
    for (const item of data) {
      const resp = await axios.post(url, item);
      console.log("RESP :", resp.data.result);
      var log_data = JSON.stringify({
        item: item,
        status: resp.data.result,
      });
      await frcLogStream(log_data);
    }
  } catch (err) {
    console.log("CATCH ON: ", err.config.data);
    console.log("CATCH ERR: ", err.response.data);
    console.log("To see more information: /log/frc_err.log");
    var log_data = JSON.stringify({
      item: err.config.data,
      status: err.response.data,
    });

    await frcErrLogStream(log_data);
  }

  // await Promise.all(data.map(async item => {
  //     console.log("SENDING: ", item)
  //     await axios.post(url, item)
  //         .then((resp) => {
  //             console.log("AXIOS POST RESP: ", resp.data.result)
  //         })
  //         .catch((err) => {
  //             console.log("AXIOS POST ERR: ", err)
  //         })
  // }))
};
