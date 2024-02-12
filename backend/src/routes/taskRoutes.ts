import { Router } from 'express';
import taskController from '../controllers/taskController';

const router = Router();

// Routes for task management
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.post('/:id/checklists/:checklistIndex/items',taskController.addItemInChecklist);
router.post('/:id/checklists/:checklistIndex/items/:itemIndex/toggle',taskController.checkItemInChecklist);
router.post('/:id/checklists', taskController.addChecklist); 
router.get('/:id/updated', taskController.getUpdatedTask);
router.delete('/:id/checklists/:checklistId', taskController.deleteChecklist);
export default router;
