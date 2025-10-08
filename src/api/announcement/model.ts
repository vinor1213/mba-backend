import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../config/db';

export interface AnnouncementAttributes {
  id: number;
  title: string;
  excerpt?: string;
  content: string;
  date: Date;
  category?: string;
  createdBy: number;
}

// for `Announcement.create()` calls, `id` is optional
export interface AnnouncementCreationAttributes
  extends Optional<AnnouncementAttributes, 'id'> {}

export class Announcement
  extends Model<AnnouncementAttributes, AnnouncementCreationAttributes>
  implements AnnouncementAttributes
{
  public id!: number;
  public title!: string;
  public excerpt?: string;
  public content!: string;
  public date!: Date;
  public category?: string;
  public createdBy!: number;

  // timestamps if you are using them
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Announcement.init(
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
    tableName: 'announcements',
  }
);
