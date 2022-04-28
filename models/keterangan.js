"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Keterangan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Keterangan.belongsTo(models.Merek);
      Keterangan.belongsTo(models.Shoes);
    }
  }
  Keterangan.init(
    {
      MerekId: DataTypes.INTEGER,
      ShoesId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Keterangan",
    }
  );
  return Keterangan;
};
