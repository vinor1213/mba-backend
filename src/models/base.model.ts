import { Model, DataTypes } from 'sequelize';

export default (attrs: any, opts: any) => {
  return {
    ...attrs,
    createdBy: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  };
};
