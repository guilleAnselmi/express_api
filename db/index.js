import { mongoDbConnection } from "./mongo";
// import { sequelizeConnection } from "./sequelize";

export const dbConnection = () => {
  return mongoDbConnection();
  // return sequelizeConnection();
};
