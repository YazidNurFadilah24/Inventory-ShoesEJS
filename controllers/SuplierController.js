const { Suplier } = require("../models");

class SuplierController {
  static async getSupliers(req, res) {
    try {
      let supliers = await Suplier.findAll();
      res.render("suplierPage.ejs", { supliers });
    } catch (err) {
      res.json(err);
    }
  }
  static async getSuplier(req, res) {
    const id = Number(req.params.id);

    try {
      let suplier = await Suplier.findOne({
        where: {
          id: id,
        },
      });
      res.json(suplier);
    } catch (err) {
      res.json(err);
    }
  }
  static async displayAddSuplierForm(req, res) {
    res.render("addSuplierForm.ejs");
  }
  static async addSuplier(req, res) {
    console.log(req.body);
    const { name, type, image, price, description } = req.body;

    try {
      await Suplier.create({ name, type, image, price, description });
      res.redirect("/suplier");
    } catch {
      res.json({
        message: "Couldn't add suplier'",
      });
    }
  }
  static async deleteSuplier(req, res) {
    const id = Number(req.params.id);

    try {
      await Suplier.destroy({
        where: { id: id },
      });
      res.redirect("/suplier");
    } catch {
      res.json({ message: "Couldn't delete suplier" });
    }
  }

  static async displayEditSuplierForm(req, res) {
    const id = Number(req.params.id);

    try {
      let suplier = await Suplier.findOne({ where: { id: id } });
      res.render("editSuplierForm.ejs", { suplier });
    } catch (err) {
      res.json({ message: err });
    }
  }
  static async updateSuplier(req, res) {
    const id = Number(req.params.id);
    const { name, type, image, price, description } = req.body;

    try {
      await Suplier.update(
        { name, type, image, price, description },
        { where: { id: id } }
      );
      res.redirect("/suplier");
    } catch {
      res.json({ message: "Couldn't update suplier" });
    }
  }
}

module.exports = SuplierController;
