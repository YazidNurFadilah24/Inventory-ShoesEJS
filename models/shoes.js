"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shoes.belongsToMany(models.Merek, { through: models.Keterangan });
    }
  }
  Shoes.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      id_card_number: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      nationality: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shoes",
    }
  );
  return Shoes;
};
