import { Model, ModelStatic, FindAndCountOptions } from 'sequelize';

export interface PaginatedResult<T> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Generic pagination function
 * @param model - Sequelize model to paginate
 * @param page - current page number
 * @param pageSize - number of items per page
 * @param options - additional Sequelize options like include, where, attributes
 */
export async function paginate<T extends Model>(
  model: ModelStatic<T>,
  page: number = 1,
  pageSize: number = 10,
  options: FindAndCountOptions = {}
): Promise<PaginatedResult<T>> {
  const offset = (page - 1) * pageSize;

  const { rows, count } = await model.findAndCountAll({
    ...options,
    limit: pageSize,
    offset,
  });

  const totalPages = Math.ceil(count / pageSize);

  return {
    total: count,
    page,
    pageSize,
    totalPages,
    data: rows,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
