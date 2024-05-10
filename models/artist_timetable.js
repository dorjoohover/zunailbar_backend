"use strict";
module.exports = (sequelize, DataTypes) => {
  const ArtistTimetable = sequelize.define(
    "artist_timetable",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      artistId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
      },
      startDate: {
        type: DataTypes.TIME,
        defaultValue: null,
      },
      endDate: {
        type: DataTypes.TIME,
        defaultValue: null,
      },
    },
    {
      tableName: "artist_timetables",
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
    }
  );

  ArtistTimetable.associate = function (models) {
    // Define associations here
  };

  return ArtistTimetable;
};
