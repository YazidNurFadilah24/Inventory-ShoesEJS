const route = require("express").Router();

route.get("/", (req, res) => {
  res.render("index.ejs");
});

const MerekRoute = require("./MerekRoute");
route.use("/merek", MerekRoute);

const ShoesRoute = require("./ShoesRoute");
route.use("/shoes", ShoesRoute);

const KeteranganRoute = require("./KeteranganRoute");
route.use("/keterangan", KeteranganRoute);

const SuplierRoute = require("./SuplierRoute");
route.use("/suplier", SuplierRoute);

module.exports = route;
