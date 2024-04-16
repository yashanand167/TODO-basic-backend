import { resgiterUser, userLogin } from '../controller/users.controller.js';
import { createTask, updateTask, searchforTask, deleteTask } from '../controller/tasks.controller.js';

import express from 'express';
const router = express.Router();

router.post('/register', resgiterUser);
router.post('/login', userLogin);
// router.post('/logout', userLogout);

router.post('/create', createTask);
router.put('/update', updateTask);
router.post('/search', searchforTask);
router.delete('/delete', deleteTask);

export default router;
