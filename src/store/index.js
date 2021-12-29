import { createStore, combineReducers } from 'redux';

// Reducers
import userReducer from './userReducer.js';
import contactReducer from './contactReducer.js';
import messageReducer from './messageReducer.js';

// We can add reducers below

const reducers = combineReducers({
  contacts: contactReducer,
  messageQueue: messageReducer,
  user: userReducer,
});

const store = () => {
  return createStore(reducers);
}

export default store;