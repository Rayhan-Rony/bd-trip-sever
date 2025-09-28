const express = require("express");
const router = express.Router();
const toursController = require("../controllers/tours.controllers");

router.get("/", toursController.getAllTours);
router.post("/", toursController.createTour);
module.exports = router;
