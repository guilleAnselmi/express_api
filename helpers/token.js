//TODO refactor this(are bad written and old)

import jwt from "jsonwebtoken";
import Debug from "debug";
const debug = Debug("app:token");

const createToken = async (data) => {
  try {
    const token = jwt.sign({ data }, process.env.TOKEN_SECRET);
    return Promise.resolve(token);
  } catch (error) {
    debug("create token err:", error);
    throw error;
  }
};

// Auth Required middleware
const required = (req, res, next) => {
  const tok = req.headers.authorization || null;

  if (tok && tok.split(" ")[0] === "Bearer") {
    jwt.verify(tok.split(" ")[1], process.env.TOKEN_SECRET, (err, token) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized",
          error: err,
        });
      }
      debug(`token verificado con exito ${JSON.stringify(token)}`);
      req.token = token;
      next();
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export { createToken, required };
