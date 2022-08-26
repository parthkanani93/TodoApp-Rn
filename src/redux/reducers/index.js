import {combineReducers} from 'redux';
import todoReducers from './todoReducers';

// Main Root Reducer Which Combine All Reducers
const rootReducer = combineReducers({
  todo: todoReducers,
});

export default rootReducer;
