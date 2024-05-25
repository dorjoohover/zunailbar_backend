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
      additional_serviceName: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      default_price: {
        type: DataTypes.DECIMAL(12, 0),
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING(255),
        defaultValue: null,
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
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  additional_service.associate = function (models) {
    additional_service.hasMany(models.booking_detail);
    additional_service.belongsTo(models.service, { foreignKey: "serviceId" });
  };

  return additional_service;
};
