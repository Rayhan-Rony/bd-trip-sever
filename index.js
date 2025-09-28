const express = require("express");

const cors = require("cors");
const { connectToDB, closeDb } = require("./db");
const toursRouter = require("./routes/tours.routes");
const errorHandler = require("./middleware/errorHandler");

const { PORT } = require("./config");
const app = express();
// middleWare
app.use(cors());
app.use(express.json());

connectToDB()
  .then(() => {
    app.use("/api/tours", toursRouter);

    app.get("/", (req, res) => {
      res.send("tour is on");
    });
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`server is running ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`server not running because of this culprit : ${error}`);
  });
