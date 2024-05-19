"use strict";
module.exports = (sequelize, DataTypes) => {
  const branch = sequelize.define(
    "branch",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      branch: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      name: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      address: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      description: {
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
      tableName: "branches",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  branch.associate = function (models) {
    branch.hasMany(models.artist, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
    branch.hasMany(models.manager, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };
  return branch;
};
