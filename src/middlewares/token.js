const jwt = require("jsonwebtoken");
const Debug = require("debug");
const settings = require("../config/settings");
const debug = new Debug("api/middleware/token");

export const required = (req, res, next) => {
  const tok = req.headers.authorization || null;
  console.log(`TOKENNN `, tok);

  if (!tok) {
    console.log("JWT was not enctrypted with our secret");
    return res.status(401).json({
      message: "Unauthorized 1"
    });
  }
  if (
    req.headers &&
    req.headers.authorization &&
    tok.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(tok.split(" ")[1], settings.token.secret, (err, token) => {
      if (err) {
        console.log("JWT was not enctrypted with our secret");
        return res.status(401).json({
          message: "Unauthorized 2",
          error: err
        });
      }
      console.log(`token verificado con exito ${JSON.stringify(token)}`);
      req.token = token;
      next();
    });
  } else {
    res.status(401).json({
      message: `don't have permission to access this data`
    });
  }
};

export const isAdmin = (req, res, next) => {
  console.log(req.token);
  if (req.token.data.role == 1) {
    next();
  } else {
    res.status(401).json({
      message: `don't have permission to access this data`
    });
  }
};
