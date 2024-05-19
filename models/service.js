"use strict";
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "service",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      serviceName: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      status: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      price: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      isDefault: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      image1: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      image2: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      image3: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      // serviceTypeId: {
      //   type: DataTypes.INTEGER,
      //   defaultValue: null,
      // },
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
      tableName: "services",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Service.associate = function (models) {
    Service.belongsTo(models.service_group, {
      foreignKey: "serviceGroupId",
    });
    // Service.belongsTo(models.service_type, { foreignKey: "serviceTypeId" });
    Service.hasMany(models.booking, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
    Service.hasMany(
      models.additional_service,
      { foreignKey: "serviceId" },
      {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      }
    );
    Service.hasMany(models.artist_service, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return Service;
};
