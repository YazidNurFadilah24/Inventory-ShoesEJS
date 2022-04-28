const { Keterangan, Merek, Shoes, Suplier } = require("../models");

class KeteranganController {
  static async getKeteranganss(req, res) {
    try {
      let keteranganss = await Keterangan.findAll({
        include: [Merek, Shoes],
      });

      let keteranganssObj = {};
      let mereks = [];
      let shoess = [];
      let suplierIds = [];

      if (keteranganss.length !== 0) {
        mereks = mereks.map((keterangan) => {
          return keterangan.Merek.dataValues;
        });

        shoess = keteranganss.map((keterangan) => {
          return keterangan.Shoes.dataValues;
        });

        suplierIds = keteranganss.map((keterangan) => {
          return keterangan.Merek.dataValues.SuplierId;
        });

        let mereksData = await Merek.findAll({
          include: [Suplier],
          where: {
            SuplierId: suplierIds,
          },
        });

        let supliers = mereksData.map((data) => {
          return data.dataValues.Suplier;
        });

        keteranganssObj = {
          mereks,
          shoess,
          supliers,
        };
      }
      res.render("keteranganPage.ejs", { keteranganssObj });
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = KeteranganController;
