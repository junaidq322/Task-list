// api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (userData: { username: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, userData);
        return response.data.token;
    } catch (error:any) {
        throw new Error(error.response.data.message || 'Error logging in');
    }
};

export const registerUser = async (userData: { username: string; password: string }) => {
    try {
        await axios.post(`${API_BASE_URL}/register`, userData);
    } catch (error:any) {
        throw new Error(error.response.data.message || 'Error registering');
    }
};

export const getAllTasks = async (token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response,"response");
        
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message || 'Error fetching tasks');
    }
};

export const createTask = async (token: any, taskData: { name: string; checklists: string[]; userId: string }) => {
    try {
        console.log("taskData",taskData);
        
        const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.task;
    } catch (error:any) {
        throw new Error(error.response.data.message || 'Error creating task');
    }
};

export const updateTask = async (token: any, taskId: string, taskData: { name: string; checklists: string[];userId: string }) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.task;
    } catch (error:any) {
        throw new Error(error.response.data.message || 'Error updating task');
    }
};

export const deleteTask = async (token: any, taskId: string) => {
    try {
        await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error:any) {
        throw new Error(error.response.data.message || 'Error deleting task');
    }
};

// export const checkItem = async (token: any, taskId: number, itemIndex: number) => {
//     try {
//         const response = await axios.put(
//             `${API_BASE_URL}/tasks/${taskId}/checklist/${itemIndex}`,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );
//         return response.data.task;
//     } catch (error:any) {
//         throw new Error(error.response.data.message || 'Error checking item');
//     }
// };

export const addItem = async (token:any, taskId:any, checklistIndex:any, newItem:any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tasks/${taskId}/checklists/${checklistIndex}/items`, { newItem }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error:any) {
        throw error.response.data;
    }
};

export const checkItem = async (token: any, taskId: any, checklistIndex: any, itemIndex: any, checked: boolean) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tasks/${taskId}/checklists/${checklistIndex}/items/${itemIndex}/toggle`, { checked }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error:any) {
        throw error.response.data;
    }
};

export const createChecklist = async (token:any, taskId:any, newChecklistName:any, newItem:any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/tasks/${taskId}/checklists`,
        { name: newChecklistName, items: [newItem] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error:any) {
      throw new Error(
        error.response.data.message || 'Error creating checklist'
      );
    }
  };
  
  export const getUpdatedTask = async (token:any,taskId: any) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}/updated`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        return response.data;
    } catch (error:any) {
        throw new Error(error.response.data.message || 'Error fetching updated task');
    }
    
};
export const deleteChecklist = async (token: any, taskId: any, checklistId: any) => {
    try {
        await axios.delete(`${API_BASE_URL}/tasks/${taskId}/checklists/${checklistId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error:any) {
        throw new Error(error.response.data.message || 'Error deleting checklist');
    }
};

