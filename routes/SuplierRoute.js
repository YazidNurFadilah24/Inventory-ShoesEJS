const SuplierRoute = require("express").Router();

const { SuplierController } = require("../controllers");

SuplierRoute.get("/", SuplierController.getSupliers);
SuplierRoute.get(
  "/addSuplier",
  SuplierController.displayAddSuplierForm
);
SuplierRoute.post("/add", SuplierController.addSuplier);
SuplierRoute.get("/delete/:id", SuplierController.deleteSuplier);
SuplierRoute.get(
  "/updateSuplier/:id",
  SuplierController.displayEditSuplierForm
);
SuplierRoute.post("/update/:id", SuplierController.updateSuplier);
SuplierRoute.get("/:id", SuplierController.getSuplier);

module.exports = SuplierRoute;
