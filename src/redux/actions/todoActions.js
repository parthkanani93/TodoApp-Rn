import {ADD_TODO, EDIT_TODO, REMOVE_TODO} from '../types';

export const addNewToDoAction = value => {
  return {
    type: ADD_TODO,
    payload: value,
  };
};

export const removeTodoAction = value => {
  return {
    type: REMOVE_TODO,
    payload: value,
  };
};

export const editTodoAction = value => {
  return {
    type: EDIT_TODO,
    payload: value,
  };
};
