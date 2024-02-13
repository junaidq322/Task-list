import React, { useEffect, useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { checkItem, getUpdatedTask } from "../services/apiService";

interface Task {
  _id: number;
  name: string;
  checklists: { name: string; items: string[]; _id: string }[];
  checkedItems: boolean[][];
}

interface TaskItemProps {
  task: Task;
  onUpdateTask: (taskId: number, newName: string) => void;
  onDeleteTask: (taskId: number) => void;
  onCheckItem: (
    taskId: number,
    checklistIndex: number,
    itemIndex: number,
    checked: boolean
  ) => void;
  onAddItem: (taskId: number, checklistIndex: number, newItem: string) => void;
  onAddChecklist: (taskId: number, newChecklistName:any, newItem:any) => void;
  onDeleteChecklist: (taskId: number, checklistId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateTask,
  onDeleteTask,
  onCheckItem,
  onAddItem,
  onAddChecklist,
  onDeleteChecklist
}) => {

    const token = localStorage.getItem("token");
  const [newName, setNewName] = useState(task.name);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [editChecklistItems, setEditChecklistItems] = useState<string[]>([]);
  const [newChecklistName, setNewChecklistName] = useState('');
    const [newItem, setNewItem] = useState<any>([]);

    const handleAddChecklist = async () => {
        if (newChecklistName.trim() !== '') {
            var changedItem ={
                text: newItem,
                checked: false
            }
            onAddChecklist(task._id, newChecklistName, changedItem);
            setNewChecklistName('');
            setNewItem('');
        }
    };
 

  if (!task.checkedItems) {
    task.checkedItems = task.checklists.map((checklist) =>
      checklist.items.map(() => false)
    );
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleUpdateTask = () => {
    onUpdateTask(task._id, newName);
  };

  const handleDeleteTask = () => {
    onDeleteTask(task._id);
  };

  const handleAddItem = (checklistIndex: number) => {
    if (newChecklistItem.trim() !== "") {
      onAddItem(task._id, checklistIndex, newChecklistItem);
      setNewChecklistItem("");
    }
  };

  const handleEditItem = (
    checklistIndex: number,
    itemIndex: number,
    value: string
  ) => {
    const updatedItems = [...task.checklists[checklistIndex].items];
    updatedItems[itemIndex] = value;
    setEditChecklistItems(updatedItems);
  };

  const handleCheckItem = async (
    checklistIndex: number,
    itemIndex: number,
    checked: boolean
  ) => {
    try {
    //   await checkItem(token, task._id, checklistIndex, itemIndex, checked);
      onCheckItem(task._id, checklistIndex, itemIndex, checked);
    } catch (error: any) {
      console.error("Error toggling item:", error.message);
      // Handle error (e.g., display error message)
    }
  };
  const handleDeleteChecklist = (checklistId: string) => {
    onDeleteChecklist(task._id, checklistId);
  };
  return (
    <div>
      <ExpansionPanelDetails>
        <div>
          <input type="text" value={newName} onChange={handleNameChange} />
          <button onClick={handleUpdateTask}>Update</button>
          <button onClick={handleDeleteTask}>Delete</button>
          <div>
                    <input
                        type="text"
                        value={newChecklistName}
                        onChange={(e) => setNewChecklistName(e.target.value)}
                        placeholder="Enter checklist name"
                    />
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Enter checklist initital item"
                    />
                    <IconButton onClick={handleAddChecklist}>
                        <AddIcon />
                    </IconButton>
                </div>
          {task?.checklists?.map((checklist, checklistIndex) => (
            <ExpansionPanel key={checklistIndex}>
                
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${checklistIndex}-content`}
                id={`panel${checklistIndex}-header`}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Typography>{checklist.name}</Typography>
                <IconButton style={{marginLeft: "auto"}}
                  onClick={() => handleDeleteChecklist(checklist._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ul>
                  {checklist?.items?.map((item:any, itemIndex:any) => (
                    
                    <li key={itemIndex}>
                      <FormControlLabel
                        control={
                            <Checkbox
                            checked={item.checked}
                            onChange={(e) =>
                                handleCheckItem(checklistIndex, itemIndex, e.target.checked)
                            }
                        />
                        }
                        label={
                          editChecklistItems &&
                          editChecklistItems[checklistIndex] !== undefined &&
                          editChecklistItems[checklistIndex][itemIndex] !==
                            undefined ? (
                            <TextField
                              value={
                                editChecklistItems[checklistIndex][itemIndex]
                              }
                              onChange={(e) =>
                                handleEditItem(
                                  checklistIndex,
                                  itemIndex,
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            <span>{item?.text}</span>
                          )
                        }
                      />
                    </li>
                  ))}
                  <li>
                    <TextField
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                    />
                    <IconButton onClick={() => handleAddItem(checklistIndex)}>
                      <AddIcon />
                    </IconButton>
                  </li>
                </ul>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      </ExpansionPanelDetails>
    </div>
  );
};

export default TaskItem;
