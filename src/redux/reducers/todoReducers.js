import {ADD_TODO, REMOVE_TODO, EDIT_TODO, ADD_FIRESTORE_DATA} from '../types';

// initial state
const INITIAL_STATE = {
  todos: [],
};

// Todo Reducer
const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FIRESTORE_DATA:
      return {
        todos: action.payload,
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        }),
      };
    default:
      return state;
  }
};

export default todoReducer;
