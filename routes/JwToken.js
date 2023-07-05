var express = require("express");
var router = express.Router();
const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

router.get("/verify_token", (req, res) => {
  const authHeader = req.headers.authorization;
  try {
    const token = authHeader.split(" ")[1];

    try {
      jsonwebtoken.verify(token, JWT_SECRET);
    } catch (ex) {
      res.send({ response: "Token isn't actual" });
    }

    res.send({
      response: "Token is actual",
    });
  } catch (ex) {
    console.log(ex);
    res.send({ response: "Token isn't actual" });
  }
});

module.exports = router;
