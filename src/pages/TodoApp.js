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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [showCompleted, setShowCompleted] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

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
    handleCloseDialog();
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
            onClick={handleOpenDialog}
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

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete All Todos?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete all todos? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteAllTodos} color="secondary" autoFocus>
              Delete All
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ResizableBox>
  );
}

export default TodoApp;
