const ShoesRoute = require("express").Router();

const { ShoesController } = require("../controllers");

ShoesRoute.get("/", ShoesController.getShoes);
ShoesRoute.get("/addShoes", ShoesController.displayAddShoesForm);
ShoesRoute.get("/assignShoes", ShoesController.displayAssignShoesPage);
ShoesRoute.post("/add", ShoesController.addShoes);
ShoesRoute.get("/delete/:id", ShoesController.deleteShoes);
ShoesRoute.get("/updateForm/:id", ShoesController.displayUpdateShoesForm);
ShoesRoute.post("/update/:id", ShoesController.updateShoes);
ShoesRoute.get("/:id", ShoesController.getShoes);

module.exports = ShoesRoute;
