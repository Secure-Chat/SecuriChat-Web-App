//imports
import React from 'react';

//components
import Message from '../message/Message';

export default function Chat(props) {
  const handleMessage = (e) => {
    // Insert message adding software here... can be code from reducer
  };

  return (
    <>
      <div>
        {props.messages.map((message) => (
          <Message message={message} />
        ))}
      </div>
      <form onSubmit={handleMessage}>
        <textarea onChange={props.setMessage}></textarea>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
