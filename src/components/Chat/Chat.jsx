import React, { useEffect, useState } from 'react'
import { user } from "./../Join";
import socketIo from "socket.io-client";
import "./../Chat/Chat.css";
import sendLogo from "./../../images/send.png"
import Message from "./../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../../images/closeIcon.png";

const ENDPOINT = 'https://subhchat.onrender.com';

let socket;

const Chat = () => {

  const [messages, setmessages] = useState([])


  const [id, setid] = useState("")


  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id});
    document.getElementById('chatInput').value = "";
  }


  useEffect(() => {

    socket = socketIo(ENDPOINT, { transports: ['websocket', 'polling'] });
    socket.on("connect", () => {
      alert("Weclome to Subham's Chat");
      setid(socket.id)
    })

    socket.emit('joined', { user })

    socket.on(`welcome`, (data) => {
      setmessages([...messages, data]);
      console.log(data.user, data.message);
    })

    socket.on('userJoined', (data) => {
      setmessages([...messages, data]);
      console.log(data.user, data.message)
    })

    socket.on(`leave`, (data) => {
      setmessages([...messages, data]);
      console.log(data.user, data.message);
    })

    return () => {
      socket.disconnect();
      socket.off();
    }
  }, [])

  console.log(messages);
  useEffect(() => {
    socket.on(`sendMessage`, (data) => {
      setmessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    })


    return () => {
      socket.off();
    }
  }, [messages])


  return (
    <div className='chatPage'>
      <div className="chatContainer">
        <div className="header">
          <h2>C Chat</h2>
          <a href="/"> <img src={closeIcon} alt="Close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => <Message user={item.id === id ? `` : item.user} message={item.message} classs={item.id === id ? `right` : `left`} />)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyDown={(event) => event.key === "Enter" ? send() : null} type="text" id='chatInput' />
          <button className='sendBtn' onClick={send}><img src={sendLogo} alt="Send" /></button>
        </div>
      </div>
    </div>
  )
}

export default Chat
