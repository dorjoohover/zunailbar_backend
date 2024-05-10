"use strict";
module.exports = (sequelize, DataTypes) => {
  const ArtistRating = sequelize.define(
    "artist_rating",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      artistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ratingPoint: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      ratingComment: {
        type: DataTypes.STRING(455),
        defaultValue: null,
      },
      approval: {
        type: DataTypes.STRING(45),
        defaultValue: null,
      },
    },
    {
      tableName: "artist_ratings",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  ArtistRating.associate = function (models) {
    // Define associations here
  };

  return ArtistRating;
};
