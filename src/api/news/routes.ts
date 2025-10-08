import { Router } from 'express';

import { authenticate, authorize } from '../../middlewares/auth.middleware';
import { schema } from './sanitize';
import{ createNews, updateNews, deleteNews,listNews,getNews } from './controller';

const router = Router();

router.get('/', listNews);
router.get('/:id', getNews);
router.post('/', authenticate, authorize(['admin','superadmin']), createNews);
router.put('/:id', authenticate, authorize(['admin','superadmin']), updateNews);
router.delete('/:id', authenticate, authorize(['admin','superadmin']), deleteNews);

export default router;
