import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import MessageBox from './messageBox/messageBox';
const body = ({ message, name }) => {
  return (
    <ScrollToBottom className="bg-light chatbox">
      {message.map((message, i) => (
        <MessageBox key={i} message={message} name={name} />
      ))}
    </ScrollToBottom>
  );
};

export default body;
