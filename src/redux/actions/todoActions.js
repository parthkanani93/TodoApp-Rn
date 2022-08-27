import {ADD_TODO, EDIT_TODO, REMOVE_TODO, ADD_FIRESTORE_DATA} from '../types';

// Set FireStore Data
const addFireStoreDataAction = value => {
  return {
    type: ADD_FIRESTORE_DATA,
    payload: value,
  };
};

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
export {
  addFireStoreDataAction,
  addNewToDoAction,
  removeTodoAction,
  editTodoAction,
};
