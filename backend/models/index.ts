import { Sequelize } from "sequelize";
import sequelize from "../src/config/db";
import User from "../src/modules/users/users.model";

const db: {
  sequelize: Sequelize;
  User: typeof User;
  [key: string]: any;
} = {
  sequelize,
  User,
};

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database or create tables:", err);
  });

export default db;
