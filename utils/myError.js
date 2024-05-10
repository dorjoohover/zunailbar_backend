// const logger = require("./logger");
class MyError extends Error {
  constructor(message, statusCode, res) {
    super(message);

    this.statusCode = statusCode;
    // logger.error(`${statusCode}:::${message}`);
  }
  sendResponse(res, status) {
    res.status(status).json({
      status: false,
      message: this.message,
    });
  }
}
module.exports = MyError;
