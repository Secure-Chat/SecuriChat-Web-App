import axios from "axios";
import { v4 as uuid } from 'uuid';
import { getUserData, saveUserData } from './middleware/dataStore';
import env from 'react-dotenv';

const REACT_APP_DATABASE_URL = process.env.REACT_APP_DATABASE_URL;

let initialState = {
  contactList: {}
}

// contactList makeup:
// contactList = {
//   George:{
//     room: 'somestring',
//     messages: [message1, ...],
//   },
//   Cameron:{
//     room: 'someotherstring',
//     messages: [message1, ...],
//   },
// }

export default function contactReducer(state = initialState, action) {

  let { type, payload } = action;
  let { contactList } = state;

  switch (type) {
    case 'GET_CONTACTS':
      return contactList;
    case 'ADD_CONTACT':
      const { username, global, room } = payload
      if (!(username in contactList)) {
        contactList[username] = {
          global, room,
          messages: []
        };
      }
      return { contactList };
      const initialState = {
        // contacts =[],
      }
  }

  // export default function contactReducer(state = initialState, action) {
  //   switch (action.type) {
  //     case 'GET-CONTACTS': {
  //       return state;
  //     }
  //     default:
  //       return state;
  //   }
  // }
  
  export const fetchContacts = (payload) => async (dispatch) => {
    const { username, password } = payload;
    const loginString = `${username}:${password}`;
    axios.post(`${REACT_APP_DATABASE_URL}/signin`, {}, {
      headers: {
        'Authorization': `Basic ${base64.encode(loginString)}`
      }
    })
    const localContacts = 


}

  export const addContact = (name) => async (dispatch) => {
    const response = await axios.post(`${REACT_APP_DATABASE_URL}/contacts`, {
      name,
      UUID: uuid()
    });
    const data = response.data;
    dispatch({
      type: 'ADD_CONTACT',
      payload: data,
    });
  }
}

export default contactReducer;