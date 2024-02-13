import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, createTask, updateTask, deleteTask, checkItem, addItem,createChecklist, deleteChecklist } from '../services/apiService';
import TaskList from '../components/TaskList';

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<any | null>(null);
    const [newTaskName, setNewTaskName] = useState('');
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                if (!token) {
                    navigate('/login');
                    return;
                }
                const tasksData = await getAllTasks(token);
                setTasks(tasksData);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, [token, navigate]);

    const handleCreateTask = async () => {
        try {
            const newTask = await createTask(token, { name: newTaskName, checklists: [], userId: userId });
            setTasks([...tasks, newTask]);
            setNewTaskName('');
        } catch (error:any) {
            console.error('Error creating task:', error.message);
        }
    };

    const handleUpdateTask = async (taskId: any, newName: string) => {
        try {
            const updatedTask = await updateTask(token, taskId, { name: newName, checklists: [], userId: userId });
            const updatedTasks = tasks.map((task: any) => (task._id === taskId ? updatedTask : task));
            setTasks(updatedTasks);
        } catch (error:any) {
            console.error('Error updating task:', error.message);
        }
    };

    const handleDeleteTask = async (taskId: any) => {
        try {
            await deleteTask(token, taskId);
            const updatedTasks = tasks.filter((task: any) => task._id !== taskId);
            setTasks(updatedTasks);
        } catch (error:any) {
            console.error('Error deleting task:', error.message);
        }
    };

    const handleCheckItem = async (taskId: any,checklistIndex:any, itemIndex: number,checked:boolean) => {
        try {
            const updatedTask = await checkItem(token, taskId, checklistIndex,itemIndex,checked);
            const updatedTasks = tasks.map((task: any) => (task._id === taskId ? updatedTask : task));
            setTasks(updatedTasks);
        } catch (error:any) {
            console.error('Error checking item:', error.message);
        }
    };

    const handleAddItem = async (taskId: any, checklistIndex: number, newItem: any) => {
        console.log("taskId",taskId);
        
        try {
            const updatedTask = await addItem(token, taskId, checklistIndex, newItem);
            console.log(updatedTask,"handleAddChecklist");
            const updatedTasks = tasks.map((task: any) => (task._id === taskId ? updatedTask : task));
            setTasks(updatedTasks);
        } catch (error:any) {
            console.error('Error adding item:', error.message);
        }
    };

    const handleAddChecklist = async (taskId:any, newChecklistName:any, newItem:any) => {
        try {
            const updatedTask = await createChecklist(token, taskId, newChecklistName, newItem);
            console.log(updatedTask.task,"updatedTask handleAddChecklist");
            console.log(tasks,"All tasks");
            
            const updatedTasks = tasks.map((task: any) => (task._id === taskId ? updatedTask.task : task));
            console.log(updatedTasks,"updatedTasks handleAddChecklist");
            
            setTasks(updatedTasks);
        } catch (error:any) {
            console.error('Error creating checklist:', error.message)
        }
    };

    const handleDeleteChecklist = async (taskId: any, checklistId: any) => {
        try {
            await deleteChecklist(token, taskId, checklistId);
            const updatedTasks = tasks.map((task: any) => {
                if (task._id === taskId) {
                    const updatedChecklists = task.checklists.filter((checklist: any) => checklist._id !== checklistId);
                    return { ...task, checklists: updatedChecklists };
                }
                return task;
            });
            setTasks(updatedTasks);
        } catch (error:any) {
            console.error('Error deleting checklist:', error.message);
        }
    };


    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}>
            <fieldset>
                <div className="form-group">
                    <h2>Create Task</h2>
                    <input
                        type="text"
                        placeholder="New Task Name"
                        value={newTaskName}
                        onChange={e => setNewTaskName(e.target.value)}
                    />
                    <button onClick={handleCreateTask}>Create Task</button>
                    <TaskList
                        tasks={tasks}
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                        onCheckItem={handleCheckItem}
                        onAddItem={handleAddItem}
                        onAddChecklist={handleAddChecklist}
                        onDeleteChecklist={handleDeleteChecklist}
                    />
                </div>
            </fieldset>
        </div>
    );
};

export default Dashboard;
