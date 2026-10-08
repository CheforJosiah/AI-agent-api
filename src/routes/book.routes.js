import { Router } from 'express';
import { listBooks, addBook } from '../controllers/catalogControllers.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const bookRouter = Router();

bookRouter.get('/', requireAuth, listBooks);
bookRouter.post('/', requireAuth, requireRole('admin'), addBook);

export default bookRouter;