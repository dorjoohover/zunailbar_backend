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
      serviceTypeId: {
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
      timestamps: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_0900_ai_ci",
      engine: "InnoDB",
    }
  );

  artist_service.associate = function (models) {
    artist_service.belongsTo(models.artist, { foreignKey: "artistId" });
    artist_service.belongsTo(models.service, { foreignKey: "serviceId" });
  };

  return artist_service;
};
