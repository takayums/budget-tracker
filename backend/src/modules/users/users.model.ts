import { Model, DataTypes, UUIDV4, Optional } from "sequelize";
import sequelize from "@/config/db";

export interface UserAttributes {
  id: number;
  uuid: string;
  name: string;
  email: string;
  number?: string | null;
  password: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "uuid"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public uuid!: string;
  public name!: string;
  public email!: string;
  public number!: string | null;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    User.hasMany(models.Transaction, {
      foreignKey: "user_id",
      as: "transaction",
    });
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4,
      unique: true,
    },
    name: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    number: { type: DataTypes.STRING(50), allowNull: true },
    password: { type: DataTypes.STRING(225), allowNull: false },
  },
  { sequelize, modelName: "User", timestamps: true, tableName: "users" },
);

export default User;
