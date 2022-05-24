const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();

// Middleware to parse the request body.
app.use(bodyParser.json());

// Connection URL
const url = "mongodb://mongo:27017"; // "mongodb:localhost:27017" --> When you are playing with mongo db in diff network.
const client = new MongoClient(
  url,
  { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);

const dbName = "node-mongo-docker";

const db = client.db(dbName);
const collection = db.collection("notes");

async function main() {
  await client.connect();

  return "Connected successfully to server";
}

main().then(console.log).catch(console.error);

app.get("/", (req, res) => {
  const resp = { status: "success", message: "Health check !" };

  res.json(resp);
});

app.get("/notes", async (req, res) => {
  const findResult = await collection.find({}).toArray();
  const resp = { status: "success", data: findResult };

  res.json(resp);
});

app.post("/addNotes", async (req, res) => {
  await collection.insertOne(req.body);
  const resp = { status: "success", message: "Note added succesfully !" };

  res.json(resp);
});

app.put("/note/:topic", async (req, res) => {
  const { topic } = req.params;
  const resp = { status: "", message: "" };

  try {
    await collection.updateOne({ topic: topic }, { $set: req.body });
    resp.status = "success";
    resp.message = "Note updated succesfully !";
  } catch (err) {
    resp.status = "error";
    resp.message = err;
  }

  res.json(resp);
});

app.delete("/note/:topic", async (req, res) => {
  const { topic } = req.params;

  await collection.deleteOne({ topic: topic });
  const resp = { status: "success", message: "Note deleted succesfully !" };

  res.json(resp);
});

app.listen(5001, () => console.log("Server started running on port 5001"));
