import express from 'express';
import {verifyUser} from '../middleware/authMiddleware.js';
import { addDeepartment } from '../controller/departmentController.js';
const router = express.Router();

router.post('/add',verifyUser,addDeepartment)

export default router;