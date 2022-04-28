const MerekRoute = require("express").Router();

const { MerekController } = require("../controllers");

MerekRoute.get("/", MerekController.getMereks);
MerekRoute.get("/addMerek/:ShoesId", MerekController.displayAddMerekForm);
MerekRoute.post("/add/:ShoesId", MerekController.addMerek);
MerekRoute.get("/delete/:shoesId/:id/", MerekController.deleteMerek);
MerekRoute.get(
  "/updateForm/:shoesId/:id",
  MerekController.displayUpdateMerekForm
);
MerekRoute.post("/update/:shoesId/:id", MerekController.updateMerek);
MerekRoute.get("/:id/", MerekController.getMerek);

module.exports = MerekRoute;
