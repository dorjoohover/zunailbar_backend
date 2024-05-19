"use strict";
module.exports = (sequelize, DataTypes) => {
  const additional_service = sequelize.define(
    "booking_detail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      additionalServiceId: {
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
      tableName: "booking_details",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  additional_service.associate = function (models) {
    additional_service.belongsTo(models.booking, { foreignKey: "bookingId" });
    additional_service.belongsTo(models.additional_service, {
      foreignKey: "additionalServiceId",
    });
  };

  return additional_service;
};
