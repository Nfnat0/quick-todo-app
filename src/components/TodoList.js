import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleTodo, deleteTodo, editTodo, showCompleted }) {
  // Filter todos based on the showCompleted flag
  const filteredTodos = showCompleted ? todos : todos.filter(todo => !todo.completed);

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={index}
          index={index}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
