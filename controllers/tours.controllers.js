const asyncHandler = require("../middleware/asyncHandler");
const { getCollection } = require("../db");

// get api for single tours
exports.getAllTours = asyncHandler(async (req, res) => {
  const collection = getCollection("tours");
  const tours = await collection.find({}).toArray();
  res.json(tours);
});
// POST /api/tours
exports.createTour = asyncHandler(async (req, res) => {
  const collection = getCollection("tours");
  const doc = req.body;
  const result = await collection.insertOne(doc);
  res.status(201).json({ insertedId: result.insertedId });
});
