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

// async function run() {
//   const db = client.db("bdTrip");
//   const tourCollection = db.collection("tours");
//   try {
//     app.get("/tours", async (req, res) => {
//       const tours = await tourCollection.find({}).toArray();
//       res.send(tours);
//     });
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("tour is on");
// });
// app.listen(PORT, () => {
//   console.log("server is running");
// });
