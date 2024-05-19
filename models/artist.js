const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
const hashPassword = require("../utils/hashPassword");
("use strict");
module.exports = (sequelize, DataTypes) => {
  const artist = sequelize.define(
    "artist",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      position: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      salary_percent: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      jobEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      salt: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      resetToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      resetTokenExpire: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "artists",
      charset: "utf8",
      collate: "utf8_general_ci",
      defaultScope: {
        attributes: { exclude: ["password", "salt"] },
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ["password", "salt"],
          },
        },
      },
    }
  );

  artist.associate = function (models) {
    artist.belongsTo(models.branch, { foreignKey: "branchId" });
    artist.hasMany(models.artist_service, { foreignKey: "artistId" });
    artist.hasMany(models.booking, { foreignKey: "artistId" });
  };

  artist.beforeCreate(hashPassword);
  artist.beforeUpdate(hashPassword);

  artist.prototype.getJsonWebToken = function () {
    const token = jwt.sign(
      { id: this.id, status: this.status },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
  };

  artist.prototype.checkPassword = async function (password) {
    // console.log("THIS SALT: ", this.salt);
    // console.log("PASSWORD: ", password);
    // console.log("THIS PASSWORD: ", this.password);

    var hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);

    // console.log("HASH: ", hash);
    return this.password === hash;
  };

  artist.prototype.generatePasswordChangeToken = function () {
    const resetToken = crypto.randomBytes(30).toString("hex");

    // console.log("RESET TOKEN: ", resetToken);

    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = moment().add(2, "h").utc(8).format();
    console.log("RESET TOKEN: ", this.resetPasswordToken);
    console.log("RESET TOKEN: ", this.resetPasswordExpire);
    return resetToken;
  };

  artist.prototype.generateConfirmationNumber = function () {
    const confimationNumber = Math.floor(Math.random() * 999999);

    this.confirmationToken = crypto
      .createHash("sha256")
      .update(JSON.stringify(confimationNumber))
      .digest("hex");
    this.confirmationTokenExpire = moment().add(2, "h").utc(8).format();

    return confimationNumber;
  };

  artist.prototype.generateConfirmationToken = function () {
    const confirmationToken = crypto.randomBytes(30).toString("hex");

    this.confirmationToken = crypto
      .createHash("sha256")
      .update(confirmationToken)
      .digest("hex");
    this.confirmationTokenExpire = moment().add(2, "h").utc(8).format();

    return confirmationToken;
  };

  return artist;
};
