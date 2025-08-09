import { Model, Optional, DataTypes, UUIDV4 } from "sequelize";
import sequelize from "@/config/db";

export interface MonthlySummaryAttributes {
  id: number;
  uuid: string;
  month: string;
  year: string;
  total_income: string;
  total_expense: string;
  balance: string;
  ai_summary: string;
  ai_recomendation: string;
  user_id: number;
}

export interface MonthlySummaryCreationAttributes
  extends Optional<MonthlySummaryAttributes, "id" | "uuid"> {}

class MonthlySummary
  extends Model<MonthlySummaryAttributes, MonthlySummaryCreationAttributes>
  implements MonthlySummaryAttributes
{
  public id!: number;
  public uuid!: string;
  public month!: string;
  public year!: string;
  public total_income!: string;
  public total_expense!: string;
  public balance!: string;
  public ai_summary!: string;
  public ai_recomendation!: string;
  public user_id!: number;

  static associate(models: any) {
    MonthlySummary.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "summary_user",
    });
  }
}

MonthlySummary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4,
      unique: true,
    },
    month: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    total_income: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_expense: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ai_summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ai_recomendation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MonthlySummary",
    timestamps: true,
    tableName: "summary_monthly",
  },
);

export default MonthlySummary;
