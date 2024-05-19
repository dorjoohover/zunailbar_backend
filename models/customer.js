const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt-node");
const crypto = require("crypto");
const moment = require("moment");
const hashPassword = require("../utils/hashPassword");
("use strict");

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customer",
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
        // collate: "utf8mb4_general_ci",
      },
      firstName: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        // collate: "utf8mb4_general_ci",
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // collate: "utf8mb4_general_ci",
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // collate: "utf8mb4_general_ci",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // collate: "utf8mb4_general_ci",
      },
      confirm: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        // collate: "utf8mb4_general_ci",
      },
      password: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        // collate: "utf8mb4_general_ci",
      },
      salt: DataTypes.STRING,
      image: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        // collate: "utf8mb4_general_ci",
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
      },
      confirmationToken: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        // collate: "utf8mb4_general_ci",
      },
      confirmationTokenExpire: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      resetToken: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        // collate: "utf8mb4_general_ci",
      },
      resetTokenExpire: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      membership: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        // collate: "utf8mb4_general_ci",
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
      tableName: "customers",
      timestamps: true,
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
  Customer.associate = function (models) {
    Customer.hasMany(models.booking, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
    // Customer.belongsTo(models.company);
  };

  Customer.beforeCreate(hashPassword);
  Customer.beforeUpdate(hashPassword);

  Customer.prototype.getJsonWebToken = function () {
    const token = jwt.sign(
      { id: this.id, status: this.status },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
  };

  Customer.prototype.checkPassword = async function (password) {
    console.log("THIS SALT: ", this.salt);
    console.log("PASSWORD: ", password);
    console.log("THIS PASSWORD: ", this.password);

    var hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
      .toString(`hex`);

    console.log("HASH: ", hash);
    return this.password === hash;
  };

  Customer.prototype.generatePasswordChangeToken = function () {
    const resetToken = crypto.randomBytes(30).toString("hex");

    console.log("RESET TOKEN: ", resetToken);

    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = moment().add(2, "h").utc(8).format();
    console.log("RESET TOKEN: ", this.resetPasswordToken);
    console.log("RESET TOKEN: ", this.resetPasswordExpire);
    return resetToken;
  };

  Customer.prototype.generateConfirmationNumber = function () {
    const confimationNumber = Math.floor(Math.random() * 999999);

    this.confirmationToken = crypto
      .createHash("sha256")
      .update(JSON.stringify(confimationNumber))
      .digest("hex");
    this.confirmationTokenExpire = moment().add(2, "h").utc(8).format();

    return confimationNumber;
  };

  Customer.prototype.generateConfirmationToken = function () {
    const confirmationToken = crypto.randomBytes(30).toString("hex");

    this.confirmationToken = crypto
      .createHash("sha256")
      .update(confirmationToken)
      .digest("hex");
    this.confirmationTokenExpire = moment().add(2, "h").utc(8).format();

    return confirmationToken;
  };

  return Customer;
};
