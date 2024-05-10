"use strict";
module.exports = (sequelize, DataTypes) => {
  const service_type = sequelize.define(
    "service_type",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      serviceTypeName: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        collate: "utf8mb4_general_ci",
      },
      status: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        charset: "utf8mb3",
      },
      description: {
        type: DataTypes.STRING(255),
        defaultValue: null,
        charset: "utf8mb3",
        collate: "utf8mb3_general_ci",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      serviceGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "service_types",
      timestamps: true,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      engine: "InnoDB",
    }
  );

  service_type.associate = function (models) {
    service_type.belongsTo(models.service_group, {
      foreignKey: "serviceGroupId",
    });
    service_type.hasMany(models.service, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return service_type;
};
