import { Router } from 'express';
import * as ctrl from './controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { createEvent, updateEvent, deleteEvent, sendmail, uploadImage } from './controller';
import upload from '../../middlewares/upload';


const router = Router();

router.get('/', ctrl.listEvents);
router.get('/:id', ctrl.getEvent);
router.post('/', authenticate, authorize(['admin', 'superadmin']), createEvent);
router.post('/sendmail', sendmail);
router.patch('/:id', authenticate, authorize(['admin', 'superadmin']), updateEvent);
router.delete('/:id', authenticate, authorize(['admin', 'superadmin']), deleteEvent);

router.post("/upload", upload.single("image"), uploadImage);
export default router;
