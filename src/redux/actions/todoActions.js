import {ADD_TODO, EDIT_TODO, REMOVE_TODO} from '../types';

// Add NeW Todo Item
const addNewToDoAction = value => {
  return {
    type: ADD_TODO,
    payload: value,
  };
};

// Remove Particular Todo Item
const removeTodoAction = value => {
  return {
    type: REMOVE_TODO,
    payload: value,
  };
};

//Edit Particular Todo Item
const editTodoAction = value => {
  return {
    type: EDIT_TODO,
    payload: value,
  };
};

//Export All Actions
export {addNewToDoAction, removeTodoAction, editTodoAction};
