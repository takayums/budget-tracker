import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "@/config/db";

export interface TransactionAttributes {
  id: number;
  uuid: string;
  type: string;
  amount: string;
  date: Date;
  note: string;
  user_id: number;
  category_id: number;
}

export interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, "id" | "uuid"> {}
class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: number;
  public uuid!: string;
  public type!: string;
  public amount!: string;
  public date!: Date;
  public note!: string;
  public user_id!: number;
  public category_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Transaction.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Transaction.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

Transaction.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4,
      unique: true,
    },
    type: { type: DataTypes.ENUM("income", "expense"), allowNull: false },
    amount: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    note: { type: DataTypes.TEXT, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Transaction",
    timestamps: true,
    tableName: "transaction",
  },
);

export default Transaction;
