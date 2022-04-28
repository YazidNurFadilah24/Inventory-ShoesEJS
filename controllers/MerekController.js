const { Merek, Keterangan, Suplier, Shoes } = require("../models");

class MerekController {
  static async getMereks(req, res) {
    try {
      let mereks = await Merek.findAll({
        include: [Suplier],
      });

      let supliers = mereks.map((merek) => {
        return merek.dataValues.Suplier;
      });

      res.render("merekPage.ejs", { mereks, supliers });
    } catch (err) {
      res.json(err);
    }
  }
  static async getMerek(req, res) {
    const id = Number(req.params.id);

    try {
      let Merek = await Merek.findOne({
        include: [Suplier],
        where: {
          id: id,
        },
      });
      res.json(ticket);
    } catch (err) {
      res.json(err);
    }
  }
  static async displayAddMerekForm(req, res) {
    let shoesId = Number(req.params.ShoesId);
    console.log(shoesId);
    let supliers = await Suplier.findAll();
    res.render("addMerekForm.ejs", { supliers, shoesId });
  }
  static async addMerek(req, res) {
    const shoesId = Number(req.params.ShoesId);

    const { SuplierId, visit_date, qty } = req.body;

    let SuplierPrice = await Suplier.findOne({
      attributes: ["price"],
      where: {
        id: SuplierId,
      },
    });

    let grossAmount = suplierPrice.dataValues.price * qty;

    let merekData = await Merek.create({
      SuplierId,
      visit_date,
      qty,
      grossAmount,
    });

    await Keterangan.create({
      MerekId: merekData.dataValues.id,
      ShoesId: shoesId,
    });

    res.redirect("/Merek");
  }
  static async deleteMerek(req, res) {
    const id = Number(req.params.id);
    const shoesId = Number(req.params.shoesId);
    try {
      await Merek.destroy({
        where: {
          id: id,
        },
      });

      await Keterangan.destroy({
        where: {
          MerekId: id,
        },
      });
      res.redirect(`/shoes/${shoesId}`);
    } catch {
      res.json({
        message: `Can't delete shoes ${id}`,
      });
    }
  }
  static async displayUpdateMerekForm(req, res) {
    const shoesId = Number(req.params.shoesId);
    const id = Number(req.params.id);
    let merek = await Merek.findOne({
      where: { id: id },
    });
    let supliers = await Suplier.findAll();
    res.render("editMerekForm.ejs", { id, supliers, merek, shoesId });
  }
  static async updateMerek(req, res) {
    const id = Number(req.params.id);
    const shoesId = Number(req.params.shoesId);
    const { SuplierId, visit_date, qty } = req.body;

    try {
      let suplierPrice = await Suplier.findOne({
        attributes: ["price"],
        where: {
          id: SuplierId,
        },
      });

      let grossAmount = suplierPrice.dataValues.price * qty;

      await Merek.update(
        { SuplierId, visit_date, qty, grossAmount },
        {
          where: {
            id: id,
          },
        }
      );

      res.redirect(`/shoes/${shoesId}`);
    } catch {
      res.json({
        message: "Can't update merek",
      });
    }
  }
}

module.exports = MerekController;
