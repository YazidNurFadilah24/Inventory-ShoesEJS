const { Shoes, Keterangan, Merek, Suplier } = require("../models");

class ShoesController {
  static async getShoess(req, res) {
    try {
      let shoess = await Shoes.findAll({
        include: [Merek],
      });
      res.render("shoesPage.ejs", { mereks });
    } catch (err) {
      res.json(err);
    }
  }
  static async getShoes(req, res) {
    const id = Number(req.params.id);
    try {
      let shoes = await Shoes.findOne({
        where: { id: id },
        include: [Merek],
      });

      let mereksData = shoes.dataValues.Mereks.map((merek) => {
        return merek.dataValues;
      });

      let suplierIds = mereksData.map((merek) => {
        return merek.SuplierId;
      });

      let supliersClass = await Suplier.findAll({
        where: {
          id: suplierIds,
        },
      });

      let supliers = JSON.parse(JSON.stringify(supliersClass));

      let detailsObj = {
        mereksData,
        supliers,
      };

      console.log(detailsObj);

      res.render("shoesDetailsPage.ejs", { detailsObj, shoes });
    } catch (err) {
      res.json(err);
    }
  }
  static async displayAddShoesForm(req, res) {
    res.render("addShoesForm.ejs");
  }

  static async displayAssignShoesPage(req, res) {
    let shoesList = await Shoes.findAll();
    console.log(shoesList);
    res.render("assignShoesPage.ejs", { shoesList });
  }
  static async addShoes(req, res) {
    const { name, age, id_card_number, phone_number, nationality, photo } =
      req.body;
    try {
      await Tourist.create({
        name,
        age,
        id_card_number,
        phone_number,
        nationality,
        photo,
      });

      res.redirect("/shoes");
    } catch (err) {
      res.json(err);
    }
  }
  static async deleteShoes(req, res) {
    const id = Number(req.params.id);

    try {
      let keterangan = await Keterangan.findOne({
        where: { ShoesId: id },
        attributes: ["MerekId"],
      });

      if (keterangan !== null) {
        await Merek.destroy({
          where: { id: keterangan.MerekId },
        });

        await keterangan.destroy({
          where: { MerekId: keterangan.MerekId },
        });

        await Shoes.destroy({
          where: { id: id },
        });
      } else {
        await Shoes.destroy({
          where: { id: id },
        });
      }

      res.redirect("/shoes");
    } catch (err) {
      res.json({ message: "Couldn't delete shoes" });
    }
  }
  static async displayUpdateShoesForm(req, res) {
    const id = Number(req.params.id);
    let shoes = await Shoes.findOne({
      where: { id: id },
    });
    console.log(shoes);
    res.render("editShoesForm.ejs", { id, shoes });
  }
  static async updateShoes(req, res) {
    const id = Number(req.params.id);
    const { name, age, id_card_number, phone_number, nationality, photo } =
      req.body;

    try {
      await Tourist.update(
        {
          name: name,
          age: age,
          id_card_number,
          phone_number,
          nationality,
          photo,
        },
        { where: { id: id } }
      );
      res.redirect(`/shoes/${id}`);
    } catch {
      res.json({ message: "Couldn't update shoes" });
    }
  }
}

module.exports = ShoesController;
