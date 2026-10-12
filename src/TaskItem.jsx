import {useState} from "react";

export default function TaskItem({ task, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(task.text);
    };

    const handleSave = () => {
        if (editText.trim() === '') {
            handleCancel();

            return;
        }

        onUpdate(task.id, editText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSave();
        } else if (event.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <li className='task-item'>
            { isEditing ? (
                <div className='edit-mode'>
                    <input
                        type='text'
                        value={editText}
                        onChange={(event) => setEditText(event.target.value)}
                        onKeyDown={handleKeyPress}
                        className='edit-input'
                        autoFocus
                    />

                    <div className='edit-buttons'>
                        <button className='save-btn' onClick={handleSave}>💾</button>
                        <button className='cancel-btn' onClick={handleCancel}>❌</button>
                    </div>
                </div>
            ) : (
                <div className='view-mode'>
                    <span className='task-text'>{task.text}</span>
                    <div className='task-actions'>
                        <button className='edit-btn' onClick={() => handleEdit()}>✏️</button>
                    </div>
                    <div className='delete-btn'>
                        <button className='delete-btn' onClick={() => onDelete(task.id)}>🗑️</button>
                    </div>
                </div>
            ) }
        </li>
    );
}
