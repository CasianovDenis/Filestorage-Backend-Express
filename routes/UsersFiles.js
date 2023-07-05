var express = require("express");
var router = express.Router();
var token_controller = require("../Controllers/TokenVerificationController");

var MongoClient = require("mongodb").MongoClient;
var connectionString = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(connectionString);
const Collection = client.db("VueProject").collection("UsersFiles");

router.post("/store_user_file", (req, res) => {
  const result = token_controller.verify_token(req.headers.authorization);

  if (result === "Token is actual") {
    client.connect();
    Collection.insertOne(req.body)
      .then((insert_file) => {
        res.send({ response: "Operation successfull" });
        client.close();
      })
      .catch((err) => {
        console.log(err);

        res.send({ response: "Something wrong" });
        client.close();
      });
  } else res.send({ response: result });
});

router.get("/get_user_files", (req, res) => {
  const result = token_controller.verify_token(req.headers.authorization);
  let username = req.query.user;

  if (result === "Token is actual") {
    client.connect();
    Collection.find(username)
      .then((received_files) => {
        res.send({ response: received_files });
        client.close();
      })
      .catch((err) => {
        console.log(err);

        res.send({ response: "Something wrong" });
        client.close();
      });
  } else res.send({ response: result });
});

module.exports = router;
