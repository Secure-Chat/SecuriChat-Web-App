import { createStore, combineReducers } from 'redux';

// Reducers
import userReducer from './userReducer.js';
import contactReducer from './contactReducer.js';

// We can add reducers below

const reducers = combineReducers({
  users: userReducer,
  contacts: contactReducer,
});

const store = () => {
  return createStore(reducers);
}

export default store;