import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import 'react-resizable/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles.css'; // Ensure you import the styles.css file
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <ResizableBox width={400} height={600} minConstraints={[300, 300]} maxConstraints={[800, 800]}>
      <div className="todo-app">
        <h1>Todo List</h1>
        <TodoInput addTodo={addTodo} />
        <Button
          variant="contained"
          color="primary"
          onClick={toggleShowCompleted}
          startIcon={showCompleted ? <VisibilityOffIcon /> : <VisibilityIcon />}
          className="toggle-completed"
        >
          {showCompleted ? 'Hide Completed' : 'Show Completed'}
        </Button>
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
