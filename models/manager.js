const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
const hashPassword = require("../utils/hashPassword");
("use strict");
module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define(
    "manager",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      firstName: {
        type: DataTypes.STRING(255),
        defaultValue: null,
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
        defaultValue: null,
      },
      image: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      position: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      salary_percent: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobStartDate: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
      },
      jobEndDate: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      salt: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      resetToken: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      resetTokenExpire: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      tableName: "managers",
      // timestamps: true,
      // underscored: true,
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

  Manager.associate = function (models) {
    Manager.hasMany(models.booking, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
    Manager.belongsTo(models.branch, { foreignKey: "branchId" });
  };

  Manager.beforeCreate(hashPassword);
  Manager.beforeUpdate(hashPassword);

  Manager.prototype.getJsonWebToken = function () {
    const token = jwt.sign(
      { id: this.id, status: this.status },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
  };

  Manager.prototype.checkPassword = async function (password) {
    // console.log("THIS SALT: ", this.salt);
    // console.log("PASSWORD: ", password);
    // console.log("THIS PASSWORD: ", this.password);

    var hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);

    // console.log("HASH: ", hash);
    return this.password === hash;
  };

  Manager.prototype.generatePasswordChangeToken = function () {
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

  Manager.prototype.generateConfirmationNumber = function () {
    const confimationNumber = Math.floor(Math.random() * 999999);

    this.confirmationToken = crypto
      .createHash("sha256")
      .update(JSON.stringify(confimationNumber))
      .digest("hex");
    this.confirmationTokenExpire = moment().add(2, "h").utc(8).format();

    return confimationNumber;
  };

  Manager.prototype.generateConfirmationToken = function () {
    const confirmationToken = crypto.randomBytes(30).toString("hex");

    this.confirmationToken = crypto
      .createHash("sha256")
      .update(confirmationToken)
      .digest("hex");
    this.confirmationTokenExpire = moment().add(2, "h").utc(8).format();

    return confirmationToken;
  };

  return Manager;
};
