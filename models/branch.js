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
      timestamps: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_0900_ai_ci",
      engine: "InnoDB",
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
