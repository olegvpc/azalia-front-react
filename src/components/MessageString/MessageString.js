import './MessageString.css'
import React from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';



function MessageString ({ message }) {

  const currentUser = React.useContext(CurrentUserContext);
  // console.log(message, currentUser)

  return (
    <div className='message-string'>
      <text>{message.text}</text>
      <span>{message.author}</span>
    </div>
  )
}

export default MessageString