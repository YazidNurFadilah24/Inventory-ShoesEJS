"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Merek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Merek.belongsTo(models.Suplier, {
        foreignKey: "SuplierId",
      });
      Merek.belongsToMany(models.Shoes, { through: models.Keterangan });
    }
  }
  Merek.init(
    {
      SuplierId: DataTypes.INTEGER,
      visit_date: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      grossAmount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Merek",
    }
  );
  return Merek;
};
