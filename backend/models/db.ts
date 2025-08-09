import { Sequelize } from "sequelize";
import sequelize from "@/config/db";
import User from "@/modules/users/users.model";
import Category from "@/modules/category/category.model";
import Transaction from "@/modules/transaction/transaction.model";
import MonthlySummary from "@/modules/monthlySummary/summary.model";

const db: {
  sequelize: Sequelize;
  User: typeof User;
  Category: typeof Category;
  Transaction: typeof Transaction;
  MonthlySummary: typeof MonthlySummary;
  [key: string]: any;
} = {
  sequelize,
  User,
  Category,
  Transaction,
  MonthlySummary,
};

Object.values(db).forEach((model: any) => {
  if (typeof model.associate === "function") {
    model.associate(db);
  }
});

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database or create tables:", err);
  });

export default db;
