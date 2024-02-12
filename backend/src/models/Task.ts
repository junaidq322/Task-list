import { Schema, model, Document, Types } from 'mongoose';

interface IChecklistItem {
    _id: string;
    name: string;
    items: { text: string; checked: boolean; }[];
}

interface ITask extends Document {
    name: string;
    checklists: IChecklistItem[];
    userId: Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
    name: {
        type: String,
        required: true
    },
    checklists: [{
        name: {
            type: String,
            required: true
        },
        items: [{
            text: String,
            checked: Boolean  // Add a 'checked' property
        }]
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default model<ITask>('Task', taskSchema);