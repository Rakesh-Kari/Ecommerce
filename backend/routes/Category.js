// CategoryRoute.js
import express from 'express';
import { CategoryList, deleteCategory, createCategory, updateCategory } from '../controllers/Category.js';
import { adminAuth } from '../middleware/adminAuth.js';
import { AuthMiddleware } from "../middleware/auth.js"

const categoryRouter = express.Router();

categoryRouter.get('/list', CategoryList);
categoryRouter.post('/create', AuthMiddleware, adminAuth, createCategory )
categoryRouter.delete('/:id', AuthMiddleware, adminAuth, deleteCategory)
categoryRouter.put('/:id', AuthMiddleware, adminAuth, updateCategory)

export default categoryRouter;
