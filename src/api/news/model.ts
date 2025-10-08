import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../config/db';

export interface NewsAttributes {
  id: number;
  title: string;
  excerpt?: string;
  content: string;
  date: Date;
  category?: string;
  createdBy: number;
}

// For creation, `id` will be optional since it's auto-increment
export interface NewsCreationAttributes extends Optional<NewsAttributes, 'id'> {}

export class News
  extends Model<NewsAttributes, NewsCreationAttributes>
  implements NewsAttributes
{
  public id!: number;
  public title!: string;
  public excerpt?: string;
  public content!: string;
  public date!: Date;
  public category?: string;
  public createdBy!: number;

  // timestamps if enabled
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

News.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'news',
  }
);
