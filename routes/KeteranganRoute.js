const KeteranganRoute = require("express").Router();

const { KeteranganController } = require("../controllers");

KeteranganRoute.get("/", KeteranganController.getKeteranganss);

module.exports = KeteranganRoute;
