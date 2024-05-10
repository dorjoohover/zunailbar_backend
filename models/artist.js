"use strict";
module.exports = (sequelize, DataTypes) => {
  const artist = sequelize.define(
    "artist",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        collate: "utf8mb4_general_ci",
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        collate: "utf8mb4_general_ci",
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        collate: "utf8mb4_general_ci",
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
        collate: "utf8mb4_general_ci",
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        collate: "utf8mb4_general_ci",
      },
      position: {
        type: DataTypes.STRING(255),
        allowNull: true,
        collate: "utf8mb4_general_ci",
      },
      salary_percent: {
        type: DataTypes.STRING(255),
        allowNull: true,
        collate: "utf8mb4_general_ci",
      },
      branchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      jobEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        collate: "utf8mb4_general_ci",
      },
      salt: {
        type: DataTypes.STRING(255),
        allowNull: true,
        collate: "utf8mb4_general_ci",
      },
      resetToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
        collate: "utf8mb4_general_ci",
      },
      resetTokenExpire: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "artists",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  artist.associate = function (models) {
    artist.belongsTo(models.branch, { foreignKey: "branchId" });
    artist.hasMany(models.artist_service, { foreignKey: "artistId" });
    artist.hasMany(models.booking, { foreignKey: "artistId" });
  };

  return artist;
};
