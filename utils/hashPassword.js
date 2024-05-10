const bcrypt = require("bcrypt-node");
const crypto = require("crypto");

var oldHashPassword = (user) => {
  // if(!user.changed('password')) return true
  return new Promise(async (resolve, reject) => {
    console.log("USER: ", user.password);
    // var salt = await bcrypt.genSalt(10)
    bcrypt.hash(user.password, null, null, function (error, result) {
      if (error) {
        console.log("ERR: ", error);
        reject(error);
      } else {
        console.log("RESULT: ", result);
        resolve(result);
      }
    });
  }).then((result) => {
    console.log("RESULT: ", result);
    user.password = result;
  });
};

var hashPassword = (user) => {
  // console.log("HASH PASSWORD USER: ", user);
  try {
    if (user.password) {
      var salt = crypto.randomBytes(16).toString("hex");
      console.log("SALT: ", salt);

      var password = crypto
        .pbkdf2Sync(user.password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
      console.log("PASSWORD: ", password);
      user.password = password;
      user.salt = salt;
    }
  } catch (err) {
    throw new Error("Error on hash password", 500);
  }
  /*
  return new Promise(async (resolve, reject) => {
    resolve({password: password, salt: salt});
  })
  .then((result) => {

    console.log("RESULT: ", result);
  });  */
};

module.exports = hashPassword;
