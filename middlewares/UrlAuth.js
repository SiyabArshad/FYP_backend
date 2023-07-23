const jwt = require("jsonwebtoken");
const base64url = require("base64url");
const ResponseManager = require("../helpers/Message");

function urlauthenticate(req, res, next) {
  const authHeader =
    req.body.token ||
    req.query.token ||
    req.headers["token"] ||
    (req.cookies && req.cookies.digischool);
  console.log("request stuck here in middleware", authHeader);

  if (!authHeader) {
    return res
      .status(401)
      .json(ResponseManager.errorResponse("You are not authenticated", 401));
  }

  const token = authHeader;

  // Decode the URL-safe token to get the original token value
  const originalToken = base64url.decode(token);

  jwt.verify(originalToken, process.env.SECKEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json(ResponseManager.errorResponse("Token not valid", 403));
    }
    req.user = user;
    next();
  });
}

module.exports = { urlauthenticate };
