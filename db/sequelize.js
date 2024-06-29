import { Sequelize } from "sequelize";
import initModels from "../models/init-models";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export const Models = initModels(sequelize);

export const sequelizeConnection = () => {
  return sequelize.authenticate();
};
