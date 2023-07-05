const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

function verify_token(token_from_header) {
  try {
    const token = token_from_header.split(" ")[1];

    jsonwebtoken.verify(token, JWT_SECRET);

    return "Token is actual";
  } catch (ex) {
    console.log(ex);
    return "Token isn't actual";
  }
}

module.exports = { verify_token };
