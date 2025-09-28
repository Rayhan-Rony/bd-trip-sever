const { MongoClient, ServerApiVersion } = require("mongodb");
const { MONGODB_URI, DB_NAME } = require("../config");

let db;
let client;
async function connectToDB() {
  if (db) return { db, client };
  client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  db = client.db(DB_NAME);
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  return { client, db };
}

function getDB() {
  if (!db) throw new error("database isn't connected");
  //   why we use new error instead of throw ?
  // In JavaScript, you can throw any value:throw "something went wrong";   // string
  // throw 404;                      // number
  // throw { message: "error" };     // object
  //  these are not real Error objects, so they don’t give a stack trace (where the error happened in your code).
  // throw new Error("Database isn't connected");
  // JavaScript creates a real Error object. That means:
  // It has a message property ("Database isn't connected")
  // It has a stack trace (line numbers & file name where the error happened)

  if (!db) throw new error("database isn't connected");
  return db;
}
function getCollection(name) {
  return getDB().collection(name);
}
async function closeDB() {
  if (client) await client.close();
}
module.exports = {
  connectToDB,
  getDB,
  getCollection,
  closeDB,
};
