import React from 'react';

const ChecklistItem: React.FC<{ item: string }> = ({ item }) => {
    return (
        <li>
            <input type="checkbox" />
            <span>{item}</span>
        </li>
    );
};

export default ChecklistItem;
