import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { setChat } from '../../../features/chatSlice';
import { useDispatch } from 'react-redux';
import db from '../../../firebase/firebase';
import moment from 'moment';
import './SidebarChats.css';

function SidebarChats({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    db.collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setChatInfo(snapshot.docs.map(doc => doc.data()))
      );
  }, [id]);

  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
      className="sidebarChat"
    >
      <Avatar src={chatInfo[0]?.photo} />
      <div className="sidebarChats__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>
          {moment(new Date(chatInfo[0]?.timestamp?.toDate())).fromNow()}
        </small>
      </div>
    </div>
  );
}

export default SidebarChats;
