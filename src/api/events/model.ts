import { Model, DataTypes, Optional } from 'sequelize'
import { sequelize } from '../../config/db'

export interface EventAttributes {
  id: number
  title: string
  metatitle?: string
  metaDescription?: string   // ✅ new
  content: string
  startDate: Date
  endDate: Date
  category?: string
  createdBy: number
  images?: string[]          // array of image URLs or paths
  posterImage?: string       // ✅ new (main poster image)
  approved: boolean
  createdAt?: Date
  updatedAt?: Date
}

// When creating a new event, these will be optional
export interface EventCreationAttributes
  extends Optional<
    EventAttributes,
    'id' | 'approved' | 'createdAt' | 'updatedAt' | 'metatitle' | 'metaDescription' | 'category' | 'images' | 'posterImage'
  > { }

export class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes {
  public id!: number
  public title!: string
  public metatitle?: string
  public metaDescription?: string   // ✅ new
  public content!: string
  public startDate!: Date
  public endDate!: Date
  public category?: string
  public createdBy!: number
  public images?: string[]
  public posterImage?: string       // ✅ new
  public approved!: boolean

  // timestamps (managed by Sequelize)
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Event.init(
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
    metatitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metaDescription: {
      type: DataTypes.STRING, // SEO description
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
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
    images: {
      type: DataTypes.JSON, // array stored as JSON
      allowNull: true,
    },
    posterImage: {
      type: DataTypes.TEXT('long'), // allows very large strings (up to 4GB)
      allowNull: true,
    },

    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'events',
    timestamps: true,
  }
)
