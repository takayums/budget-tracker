import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/db";

interface CategoryAttributes {
  id: number;
  name: string;
  description: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: false },
  },
  {
    sequelize,
    modelName: "Category",
    timestamps: true,
    tableName: "categories",
  },
);

export default Category;
