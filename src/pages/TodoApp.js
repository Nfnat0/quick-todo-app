import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import 'react-resizable/css/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

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

  return (
    <ResizableBox width={400} height={600} minConstraints={[300, 300]} maxConstraints={[800, 800]}>
      <div className="todo-app">
        <h1>Todo List</h1>
        <TodoInput addTodo={addTodo} />
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
      </div>
    </ResizableBox>
  );
}

export default TodoApp;
