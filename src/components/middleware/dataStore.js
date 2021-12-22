'use strict';

// const PLATFORM = process.platform;
// console.log("Platform: ", PLATFORM);

const fs = require('fs');

// on authentication
const getUserData = (user) => {
  const { username, token } = user;
  let userData = {
    username,
    messageQueue: {},
    contactList: {},
  };


  try {
    fs.readFile(`userData-${username}.json`, (err, data) => {
      if(err) {
        if (err.code === 'ENOENT') {
          return userData;
        }
      }
      let parsedUserData = JSON.parse(data);
      for (const key in userData) {
        if (key in parsedUserData) {
          userData[key] = parsedUserData[key];
        }
      }
    });

    return userData;
  } catch (err) {
    console.error(err);
  }
}

const saveUserData = ( props ) => {
  const { username, token } = props.user.user;
  const parsedUserData = {
    username,
    messageQueue: props.messageQueue.messageQueue,
    contactList: props.contacts.contactList
  }
  try {
    fs.writeFile(`userData-${username}.json`, JSON.stringify(parsedUserData), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getUserData,
  saveUserData
}
