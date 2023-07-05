var express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var connectionString = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(connectionString);
const Collection = client.db("VueProject").collection("Users");

const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

router.post("/Login", (req, res) => {
  const body_Username = req.body.Username;
  const body_Password = req.body.Password;
  client.connect();

  Collection.findOne({
    Username: body_Username,
  }).then((result) => {
    if (
      result.Username === body_Username &&
      result.Password === body_Password
    ) {
      client.close();

      return res.json({
        response: "Successful authentication",
        token: jsonwebtoken.sign({ user: body_Username }, JWT_SECRET, {
          algorithm: "HS256",
          expiresIn: "24h",
        }),
      });
    } else res.send({ response: "Password or Username is incorrect" });
  });
});

router.post("/Create_user", (req, res) => {
  var result_username = "";

  client.connect();
  (async () => {
    await Collection.findOne({
      Username: req.body.Username,
    }).then((result) => {
      if (result === null) result_username = "Username is free";
      else {
        client.close();
        result_username = "Username already used";
      }
    });

    if (result_username === "Username is free")
      await Collection.findOne({ Email: req.body.Email }).then((result) => {
        if (result !== null) {
          res.send({ response: "Email already used" });
        } else {
          Collection.insertOne(req.body)
            .then((create_user) => {
              res.send({ response: "Successfully created account" });
              client.close();
            })
            .catch((err) => {
              res.send({ response: "Something wrong" });
            });
        }
      });
    else res.send({ response: "Username already used" });
  })();
});

module.exports = router;
