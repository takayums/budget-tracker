import { Sequelize } from "sequelize";
import sequelize from "../src/config/db";
import User from "../src/modules/users/users.model";
import Category from "../src/modules/category/category.model";

const db: {
  sequelize: Sequelize;
  User: typeof User;
  Category: typeof Category;
  [key: string]: any;
} = {
  sequelize,
  User,
  Category,
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
