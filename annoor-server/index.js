const express = require("express");
const app = express();
const {
  MongoClient,
  ServerApiVersion,
  TopologyDescriptionChangedEvent,
} = require("mongodb");
const PORT = 5000 || process.env.PORT;
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trnyuya.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // Connecting with mongodb
    await client.connect();

    const userCollection = client
      .db("annoor-business")
      .collection("users-collection");

    app.get("/", async (req, res) => {
      res.send("Hello there!");
    });

    app.put("/backend/token", async (req, res) => {
      const userInfo = req.body;
      const doc = {
        $set: userInfo,
      };
      const uid = userInfo.uid;
      const option = {
        upsert: true,
      };
      const result = await userCollection.updateOne({ uid }, doc, option);
      const accessToken = jwt.sign({ uid }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: "1d",
      });

      res.send({ accessToken });
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(PORT, () => {
  console.log("Responding to port", PORT);
});
