import React from 'react';
import Chat from '../Chat/Chat';
import Sidebar from '../Sidebar/Sidebar';
import './iMessage.css';

function Imessage() {
  return (
    <div className="iMessage">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Imessage;
