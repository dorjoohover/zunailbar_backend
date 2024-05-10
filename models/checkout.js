"use strict";
module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define(
    "checkout",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      serviceCount: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      final_payment: {
        type: DataTypes.DECIMAL(12, 0),
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
      tableName: "checkouts",
      timestamps: true,
      underscored: true,
      charset: "utf8mb4",
      collate: "utf8mb4_0900_ai_ci",
      engine: "InnoDB",
    }
  );

  Checkout.associate = function (models) {
    Checkout.belongsTo(models.booking, { foreignKey: "bookingId" });
  };

  return Checkout;
};
