import {ADD_TODO, REMOVE_TODO, EDIT_TODO} from '../types';

// initial state
const INITIAL_STATE = {
  todos: [
    {
      id: 1,
      text: 'Learn React Native',
    },
  ],
};

// Todo Reducer
const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Math.random(),
            text: action.payload,
          },
        ],
      };
    case EDIT_TODO:
      console.log(action.payload);
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
