"use strict";
module.exports = (sequelize, DataTypes) => {
  const service_group = sequelize.define(
    "service_group",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      serviceGroupName: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      status: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      price: {
        type: DataTypes.DECIMAL(12, 0),
        defaultValue: null,
      },
      description: {
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
      tableName: "service_groups",
      timestamps: true,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      engine: "InnoDB",
    }
  );
  service_group.associate = function (models) {
    service_group.hasMany(models.service_type, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
    service_group.hasMany(models.service, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };
  return service_group;
};
