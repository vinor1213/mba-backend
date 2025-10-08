import { Router } from 'express';

import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { createAnnouncement, updateAnnouncement, deleteAnnouncement ,listAnnouncements,getAnnouncement} from './controller';
const router = Router();

router.get('/', listAnnouncements);
router.get('/:id', getAnnouncement);
router.post('/', authenticate, authorize(['admin', 'superadmin']), createAnnouncement);
router.put('/:id', authenticate, authorize(['admin', 'superadmin']), updateAnnouncement);
router.delete('/:id', authenticate, authorize(['admin', 'superadmin']), deleteAnnouncement);

export default router;
