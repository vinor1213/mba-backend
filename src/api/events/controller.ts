import { Request, Response } from 'express';
import { Event } from './model';
import { success, error } from '../../utils/response.util';

import { paginate } from '../../utils/pagination.util';
import { Op } from 'sequelize'
import dotenv from 'dotenv';
dotenv.config(); 
const SibApiV3Sdk = require('sib-api-v3-sdk');

// Configure API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendmail = async (req: Request, res: Response) => {
  try {
    const { toEmail, toName, subject, htmlContent } = req.body;

    if (!toEmail || !subject || !htmlContent) {
      return error(res, 'Missing required fields: toEmail, subject, htmlContent');
    }

    const emailData = {
      sender: { email: 'vinor1213@gmail.com', name: 'vinoth' },
      to: [{ email: toEmail, name: toName || '' }],
      subject,
      htmlContent,
    };

    // Send the email
    const response = await emailApi.sendTransacEmail(emailData);

    // Log info to server
    console.log('Email sent successfully:', {
      to: toEmail,
      name: toName,
      subject,
      messageId: response.messageId,
    });

    return success(res, null, 'Email sent successfully', 200);
  } catch (err: any) {
    console.error('Failed to send email:', err.response?.body || err.message || err);
    return error(res, 'Failed to send email');
  }
};



export const uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: "Image uploaded successfully",
    url: (req.file as any).path,
  });
};


export const createEvent = async (req: any, res: Response) => {
  try {
    const payload = { ...req.body, createdBy: req.user.id };
    const item = await Event.create(payload);
    return success(res, item, 'Created', 201);
  } catch (err) {
    console.error(err);
    return error(res, 'Create failed');
  }
};



export const listEvents = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, approved, page = '1', pageSize = '10' } = req.query;

    // Build where filter
    const where: any = {};

    if (startDate && typeof startDate === 'string') {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      where.createdAt = { ...(where.createdAt || {}), [Op.gte]: start };
    }

    if (endDate && typeof endDate === 'string') {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      where.createdAt = { ...(where.createdAt || {}), [Op.lte]: end };
    }

    if (approved && typeof approved === 'string') {
      if (approved === 'true') where.approved = true;
      if (approved === 'false') where.approved = false;
    }

    // Pagination with newest first
    const paginatedResult = await paginate(
      Event,
      parseInt(page as string, 10),
      parseInt(pageSize as string, 10),
      { where, order: [['createdAt', 'DESC']] } // <-- newest first
    );

    // Parse images
    const parsedData = paginatedResult.data.map(ev => {
      let images = ev.images;
      if (typeof images === 'string') {
        try {
          images = JSON.parse(images);
        } catch {
          images = [];
        }
      }
      return { ...ev.toJSON(), images };
    });

    return success(res, {
      ...paginatedResult,
      data: parsedData,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Failed to fetch events' });
  }
};



export const getEvent = async (req: Request, res: Response) => {
  const item = await Event.findByPk(req.params.id);
  if (!item) return error(res, 'Not found', 404);
  return success(res, item);
};

export const updateEvent = async (req: any, res: Response) => {
  const item = await Event.findByPk(req.params.id);
  if (!item) return error(res, 'Not found', 404);
  await item.update({ ...req.body, createdBy: item.createdBy });
  return success(res, item, 'Updated');
};

export const deleteEvent = async (req: Request, res: Response) => {
  const item = await Event.findByPk(req.params.id);
  if (!item) return error(res, 'Not found', 404);
  await item.destroy();
  return success(res, null, 'Deleted', 200);
};
