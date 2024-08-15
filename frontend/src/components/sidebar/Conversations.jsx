import React from 'react'  
import ConversationList from './ConversationList'

const Conversations = () => {
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      <ConversationList/>
      <ConversationList/>
      <ConversationList/>
      <ConversationList/>
      <ConversationList/>
      <ConversationList/>
      <ConversationList/>
      <ConversationList/>
    </div>
  )
}

export default Conversations
