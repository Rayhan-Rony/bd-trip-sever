const asyncHandler = require("../middleware/asyncHandler");
const { getCollection } = require("../db");

// get api for single tours
exports.getAllTours = asyncHandler(async (req, res) => {
  const sortBy = req.query.sort;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  console.log(sortBy, limit, page);
  let sortOption = {};
  if (sortBy === "Rating") {
    sortOption = { rating: 1 };
  }
  if (sortBy === "Price") {
    sortOption = { price: 1 };
  }
  if (sortBy === "Title") {
    sortOption = { title: 1 };
  }
  const collection = getCollection("tours");
  console.log("outsider");
  if (page) {
    console.log("Ok");
    // calculate skip
    const skip = (page - 1) * limit;

    // get total count for pagination info
    const total = await collection.countDocuments();

    const tours = await collection
      .find({})
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .toArray();
    // send pagination info with data
    res.json({
      data: tours,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } else {
    const tours = await collection.find({}).limit(6).toArray();
    console.log("ok hitted");
    res.json({
      data: tours,
      page: 1,
      totalPages: 1,
      totalItems: tours.length,
    });
  }
});
// POST /api/tours
exports.createTour = asyncHandler(async (req, res) => {
  const collection = getCollection("tours");
  const doc = req.body;
  const result = await collection.insertOne(doc);
  res.status(201).json({ insertedId: result.insertedId });
});
