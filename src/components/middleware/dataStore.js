// on authentication
export const getUserData = (user) => {
  const { username, token } = user;
  let userData = {
    username,
    messageQueue: {},
    contactList: {},
  };
  const userFile = `userData-${username}`;

  try {
    if ( localStorage.hasOwnProperty(userFile) ) {
      let parsedUserData = JSON.parse(localStorage.getItem(userFile));
      for (const key in userData) {
        if (key in parsedUserData) {
          userData[key] = parsedUserData[key];
        }
      }
    }

    return userData;
  } catch (err) {
    console.error(err);
  }
}

export const saveUserData = ( payload ) => {
  const { username, token } = payload.userInfo;
  const parsedUserData = {
    username,
    messageQueue: payload.messageQueue,
    contactList: payload.contactList
  }
  const userFile = `userData-${username}`;
  try {
    localStorage.setItem(userFile, JSON.stringify(parsedUserData))
    console.log('The file has been saved!');
  } catch (err) {
    console.error(err);
  }
}
