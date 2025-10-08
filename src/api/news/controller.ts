import { Request, Response } from 'express';
import { News } from './model';
import { success, error } from '../../utils/response.util';

export const createNews = async (req: any, res: Response) => {
  try{
    const payload = { ...req.body, createdBy: req.user.id };
    const item = await News.create(payload);
    return success(res, item, 'Created', 201);
  }catch(err){
    console.error(err);
    return error(res, 'Create failed');
  }
};

export const listNews = async (req: Request, res: Response) => {
  const items = await News.findAll();
  return success(res, items);
};

export const getNews = async (req: Request, res: Response) => {
  const item = await News.findByPk(req.params.id);
  if(!item) return error(res, 'Not found', 404);
  return success(res, item);
};

export const updateNews = async (req: any, res: Response) => {
  const item = await News.findByPk(req.params.id);
  if(!item) return error(res, 'Not found', 404);
  await item.update({ ...req.body, createdBy: item.createdBy });
  return success(res, item, 'Updated');
};

export const deleteNews = async (req: Request, res: Response) => {
  const item = await News.findByPk(req.params.id);
  if(!item) return error(res, 'Not found', 404);
  await item.destroy();
  return success(res, null, 'Deleted', 200);
};
