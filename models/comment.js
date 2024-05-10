"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      serviceId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      artistId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      commentText: {
        type: DataTypes.STRING(455),
        defaultValue: null,
      },
      approval: {
        type: DataTypes.STRING(45),
        defaultValue: null,
      },
    },
    {
      tableName: "comments",
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
    }
  );

  Comment.associate = function (models) {
    // Define associations here
  };

  return Comment;
};
