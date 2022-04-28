"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Suplier.hasMany(models.Merek);
    }
  }
  Suplier.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Suplier",
    }
  );
  return Suplier;
};
