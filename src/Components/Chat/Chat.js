import React, { useEffect, useState } from 'react';
import MicNoneIcon from '@material-ui/icons/MicNone';
import { IconButton } from '@material-ui/core';
import Message from './Message/Message';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from '../../features/chatSlice';
import { selectUser } from '../../features/userSlice';
import db from './../../firebase/firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import './Chat.css';

function Chat() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState('');
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot =>
          setMessages(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = e => {
    e.preventDefault();
    db.collection('chats').doc(chatId).collection('messages').add({
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chat__name"> {chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>

      <div className="chat__message">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>

      {/* chat input */}

      <div className="chat__input">
        <form>
          <input
            placeholder="iMessage"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
