import { Request, Response } from 'express';
import Task from '../models/Task';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const taskController = {
    getAllTasks: async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({});
            
            res.status(200).json(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getTaskById: async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            console.error('Error fetching task by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    createTask: async (req: Request, res: Response) => {
        try {
            const { name, checklists, userId } = req.body;
            
            const newTask = new Task({ name, checklists, userId });
            await newTask.save();

            res.status(201).json({ message: 'Task created successfully', task: newTask });
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateTask: async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
            const { name, checklist } = req.body;

            const updatedTask = await Task.findByIdAndUpdate(taskId, { name, checklist }, { new: true });
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteTask: async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;

            const deletedTask = await Task.findByIdAndDelete(taskId);
            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    addItemInChecklist: async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
            const checklistIndex: any = req.params.checklistIndex;
            const { newItem }: any = req.body; // Destructure text from req.body
            console.log(req.body,"req.body");
            
    
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
    
            // Add the new item (text) to the specified checklist
            if (!task.checklists[checklistIndex]) {
                return res.status(404).json({ message: 'Checklist not found' });
            }
            // Push the new item (text) into the items array
            task.checklists[checklistIndex].items.push({ text: newItem, checked: false });
    
            // Save the updated task
            await task.save();
    
            res.json(task); // Return the updated task
        } catch (error: any) {
            console.error('Error adding item:', error.message);
            res.status(500).json({ message: 'Server Error' });
        }
    }
    
    ,
    


    checkItemInChecklist: async (req: Request, res: Response) => {
        console.log("req",req);
        
        const { id, checklistIndex, itemIndex }: any = req.params;
        const { checked } = req.body;
    
        try {
            const task = await Task.findById(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
    
            const checklist = task.checklists[checklistIndex];
            if (!checklist) {
                return res.status(404).json({ message: 'Checklist not found' });
            }
    
            const item: any = checklist.items[itemIndex];
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
    
            // Update the 'checked' property of the item
            item.checked = checked;
    
            await task.save();
    
            res.json(task); // Return the updated task
        } catch (error:any) {
            console.error('Error toggling item:', error.message);
            res.status(500).json({ message: 'Server Error' });
        }
    },
    
    addChecklist: async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
            const { name, items, _id } = req.body;

            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            const newChecklist = { name, items , _id };
            task.checklists.push(newChecklist);
            await task.save();

            res.status(201).json({ message: 'Checklist added successfully', task });
        } catch (error) {
            console.error('Error adding checklist:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getUpdatedTask: async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task retrieved successfully', task });
        } catch (error) {
            console.error('Error fetching task by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteChecklist: async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id;
            const checklistId = req.params.checklistId;
            console.log("checklistId",checklistId);
            
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            task.checklists.findIndex(checklist => console.log(checklist._id,"oid"));
            
    
            const checklistIndex = task.checklists.findIndex(checklist => checklist._id.toString() === checklistId);
            if (checklistIndex === -1) {
                return res.status(404).json({ message: 'Checklist not found' });
            }
    
            task.checklists.splice(checklistIndex, 1);
    
            await task.save();
    
            res.status(200).json({ message: 'Checklist deleted successfully', task });
        } catch (error) {
            console.error('Error deleting checklist:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    
};

export default taskController;
