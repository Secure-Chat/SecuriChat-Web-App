// Imports
import React from 'react';
import { connect } from 'react-redux';
import { signin } from '../../store/userReducer';

// Components

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signin,
});

export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
  const DB_SERVER_URL = process.env.DB_SERVER_URL;

  const loginHandler = (e) => {
    e.preventDefault();
    axios.post(`${DB_SERVER_URL}/signin`, {}, {
      headers: {
        'Authorization': `Basic ${base64.encode(`${e.target.username.value}:${e.target.password.value}`)}`,
      }
    })
    .then(response => {
      props.signin(response);
      props.connect();
      
      // Needs socket connection and rooms... possibly in reducers but connected after this passes
    })
    .catch(error => console.log(error.message));
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <label>
          <p>Username</p>
          <input type = "username" />
        </label>
        <label>
          <p>Password</p>
          <input type ="password" />
        </label>
        <button type='submit'>Log In</button>
      </form>
    </>
  );
});

// ===================================================
// const loginData = {
//   username,
//   password
// }
// Move to user reducer
// const loginString = `${username}:${password}`;
// axios.post(`${DB_SERVER_URL}/signin`, {}, {
//   headers: {
//     'Authorization': `Basic ${base64.encode(loginString)}`
//   }
// })
// .then( response => {
//   const { token, rooms } = response.data.userInfo;
//   const user = client(`https://ez-chat-server.herokuapp.com/ezchat`);

//   const userData = getUserData(loginData);
//   const { messageQueue, messageHistory } = userData;

//   // Move to a seperate file... seperation of concerns
//   for (const room of rooms) {
//     if (!(room in messageQueue)) messageQueue[room] = [];
//   }

//   const payload = {
//     rooms,
//   };
  
//   user.emit('join', payload);
  
//   user.on('roomSyncRequest', (payload) => {
//     const { room } = payload;
  
//     for (const message of messageQueue[room]) {
//       user.emit('send', {
//         username,
//         message,
//         room
//       })
//     }
//   })
  
//   // Move to chat component
//   user.on('message', (payload) => {
//     console.log("Payload: ",payload, "<-----------------------")
//     if (!(payload.username === username)) {
//       const { message, messageTime } = payload;
//       messageHistory.push({
//         message,
//         username: payload.username,
//         dateTime: messageTime
//       });
//       console.log("Payload: ",payload, "<-----------------------")
//       console.log("Received: ", message);
//       user.emit('received', payload);
//       let userDataToSave = {
//         username,
//         password,
//         parsedUserData: {
//           messageQueue,
//           messageHistory
//         }
//       }
//       saveUserData(userDataToSave);
//     }
//   });
  
//   // move to chat component
//   user.on('received', (payload) => {
//     const { message, username, room } = payload;
//     if (username === loginData.username) {
//       const messagePosition = messageQueue[room].indexOf(message);
//       if (messagePosition > -1) messageQueue[room].slice(messagePosition, 1);
//     }
//   })
  
//   const send = (messageData) => {
//     const { message, room } = messageData;
  
//     messageQueue[room].push(message)
//     const payload = {
//       username,
//       message,
//       room,
//     };
//     user.emit('send', payload);
//     let userDataToSave = {
//       username,
//       password,
//       parsedUserData: {
//         messageQueue,
//         messageHistory
//       }
//     }
//     saveUserData(userDataToSave);
//   };

//   //testing messaging capabilities
//   setInterval(function(){send({message:"A message from 1 to 2.", room:rooms[0]})},1000)

//   // Move to sign out
//   user.on('disconnect', () => {
//     let userDataToSave = {
//       username,
//       password,
//       parsedUserData: {
//         messageQueue,
//         messageHistory
//       }
//     }
//     saveUserData(userDataToSave);
//   })
// })
// .catch(error => console.log);

// ===============================================