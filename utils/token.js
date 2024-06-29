import jwt from "jsonwebtoken";
import Debug from "debug";

const debug = Debug("app:token");

// Function to create a token
export const createToken = async (data) => {
  try {
    const token = jwt.sign({ data }, process.env.TOKEN_SECRET);
    return token;
  } catch (error) {
    debug("Error creating token:", error);
    throw new Error("Token creation failed");
  }
};

// Middleware to check JWT
export const checkJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      debug("Token verification error:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }

    debug(`Token verified successfully: ${JSON.stringify(decodedToken)}`);
    req.token = decodedToken;
    next();
  });
};
