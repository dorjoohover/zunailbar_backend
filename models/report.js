"use strict";
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "report",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      branchId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      income: {
        type: DataTypes.DECIMAL(12, 0),
        defaultValue: null,
      },
      serviceTakenCount: {
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
      tableName: "reports",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Report.associate = function (models) {
    // Define associations here
  };

  return Report;
};
