import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import mongoDbConnection from "./db/mongoConnection";
import Debug from "debug";
const debug = Debug("app:index");

(async () => {
  await mongoDbConnection();
  app.listen(process.env.SERVER_PORT, () => {
    debug(`servidor corriendo en puerto ${process.env.SERVER_PORT}`);
  });
})();
