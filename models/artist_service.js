"use strict";
module.exports = (sequelize, DataTypes) => {
  const artist_service = sequelize.define(
    "artist_service",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      artistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      serviceId: {
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
      tableName: "artist_services",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  artist_service.associate = function (models) {
    artist_service.belongsTo(models.artist, { foreignKey: "artistId" });
    artist_service.belongsTo(models.service, { foreignKey: "serviceId" });
  };

  return artist_service;
};
