import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import 'react-resizable/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, { text: todo, completed: false }]);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <ResizableBox
      className="todo-app"
      width={400}
      height={600}
      minConstraints={[300, 400]}
      maxConstraints={[1500, 1000]}
      resizeHandles={['se']}
    >
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <div className="buttons-container">
          <IconButton
            color="secondary"
            onClick={deleteAllTodos}
            className="delete-all-button"
          >
            <DeleteSweepIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={toggleShowCompleted}
            className="toggle-completed-icon"
          >
            {showCompleted ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </div>
      <div className="todo-list-container">
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          showCompleted={showCompleted}
        />
      </div>
    </ResizableBox>
  );
}

export default TodoApp;
