//imports
import React from 'react'

//components
import Message from '../message/Message'

export default function Chat(props) {
  return (
    <>
      {friend.messages.map(message => <Message message={message}/>)}
    </>
  )
}
