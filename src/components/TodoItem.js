import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

function TodoItem({ todo, index, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    editTodo(index, newText);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          onClick={() => toggleTodo(index)}
        >
          {todo.text}
        </span>
      )}
      <div className="todo-actions">
        <IconButton onClick={() => deleteTodo(index)}>
          <DeleteIcon />
        </IconButton>
        {isEditing ? (
          <IconButton onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
