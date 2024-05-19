"use strict";
module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define(
    "booking",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      confirmation: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      customerId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      artistId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      managerId: {
        type: DataTypes.INTEGER,
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
      tableName: "bookings",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  booking.associate = function (models) {
    // booking.hasMany(models.additional_service, {
    //   onDelete: "NO ACTION",
    //   onUpdate: "CASCADE",
    // });
    booking.belongsTo(models.customer, { foreignKey: "customerId" });
    booking.belongsTo(models.service, { foreignKey: "serviceId" });
    booking.belongsTo(models.artist, { foreignKey: "artistId" });
    booking.belongsTo(models.manager, { foreignKey: "managerId" });
  };

  return booking;
};
