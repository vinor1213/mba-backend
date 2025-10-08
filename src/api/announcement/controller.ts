import { Request, Response } from 'express';
import { Announcement } from './model';
import { success, error } from '../../utils/response.util';

export const createAnnouncement = async (req: any, res: Response) => {
  try {
    const payload = { ...req.body, createdBy: req.user.id };
    const item = await Announcement.create(payload);
    return success(res, item, 'Created', 201);
  } catch (err) {
    console.error(err);
    return error(res, 'Create failed');
  }
};

export const listAnnouncements = async (req: Request, res: Response) => {
  try {
    const items = await Announcement.findAll();
    return success(res, items);
  } catch (err) {
    console.error(err);
    return error(res, 'List failed');
  }
};

export const getAnnouncement = async (req: Request, res: Response) => {
  try {
    const item = await Announcement.findByPk(req.params.id);
    if (!item) return error(res, 'Not found', 404);
    return success(res, item);
  } catch (err) {
    console.error(err);
    return error(res, 'Fetch failed');
  }
};
export const updateAnnouncement = async (req: any, res: Response) => {
  try {
    const item = await Announcement.findByPk(req.params.id);
    if (!item) return error(res, 'Not found', 404);
    await item.update({ ...req.body, createdBy: item.createdBy });
    return success(res, item, 'Updated');
  } catch (err) {
    console.error(err);
    return error(res, 'Update failed');
  }
};

export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const item = await Announcement.findByPk(req.params.id);
    if (!item) return error(res, 'Not found', 404);
    await item.destroy();
    return success(res, null, 'Deleted', 200);
  } catch (err) {
    console.error(err);
    return error(res, 'Delete failed');
  }
};
