import React from 'react';
import TaskItem from './TaskItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from '@material-ui/core';

interface Task {
    _id: number;
    name: string;
    checklists: { name: string; items: string[]; _id: string }[];
    checkedItems: boolean[][];
}

interface TaskListProps {
    tasks: Task[]; 
    onUpdateTask: (taskId: number, newName: string) => void;
    onDeleteTask: (taskId: number) => void;
    onCheckItem: (taskId: number, checklistIndex: number, itemIndex: number, checked: boolean) => void;
    onAddItem: (taskId: number, checklistIndex: number, newItem: string) => void;
    onAddChecklist: (taskId: number, newChecklistName:any, newItem:any) => void;
    onDeleteChecklist: (taskId: number, checklistId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask, onCheckItem, onAddItem,onAddChecklist,onDeleteChecklist }) => {
    return (
        <div style={{ padding: '10px' }}>
            <h2>All Tasks</h2>
            {tasks && tasks.map((task) => (
                <ExpansionPanel key={task._id}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-${task._id}-content`}
                        id={`panel-${task._id}-header`}
                    >
                        <Typography>{task.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TaskItem 
                            task={task}
                            onUpdateTask={onUpdateTask}
                            onDeleteTask={onDeleteTask}
                            onCheckItem={onCheckItem}
                            onAddItem={onAddItem}
                            onAddChecklist={onAddChecklist}
                            onDeleteChecklist={onDeleteChecklist}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    );
};

export default TaskList;
