"use strict";
module.exports = (sequelize, DataTypes) => {
  const additional_service = sequelize.define(
    "additional_service",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      custom_price: {
        type: DataTypes.DECIMAL(12, 0),
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      serviceId: {
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
      tableName: "additional_services",
      timestamps: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_0900_ai_ci",
      engine: "InnoDB",
    }
  );

  additional_service.associate = function (models) {
    additional_service.belongsTo(models.booking);
    additional_service.belongsTo(models.service);
  };

  return additional_service;
};
