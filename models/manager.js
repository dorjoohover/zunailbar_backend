"use strict";
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
      timestamps: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_0900_ai_ci",
      engine: "InnoDB",
    }
  );

  Manager.associate = function (models) {
    Manager.hasMany(models.booking, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
    Manager.belongsTo(models.branch, { foreignKey: "branchId" });
  };

  return Manager;
};
