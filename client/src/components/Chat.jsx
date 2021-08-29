import React, { useState, useEffect } from "react";
import styled from "styled-components";
import queryString from "query-string";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import moment from "moment";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("chatMessage", message, () => setMessage(""));
    }
  };

  let time = moment().format("h:mm a");

  return (
    <ChatCord>
      <div className="chat-container">
        <header className="chat-header">
          <h1>Chat Chatter</h1>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>
              <i className="fas fa-comments"></i> Room Name
            </h3>
            <h2 id="project-name">{room}</h2>
            <h3>
              <i className="fas fa-users"></i> Users
            </h3>
            <div id="users">
              {users?.map(({ name }) => (
                <h3 key={name}>{name}</h3>
              ))}
            </div>
          </div>
          <ScrollToBottom className="chat-messages">
            {messages.map((message, i) => {
              const { text, user } = message;
              return (
                <div key={i} className="message">
                  <p className="meta">
                    {user} <span>{time}</span>
                  </p>
                  <h2 className="text">{text}</h2>
                </div>
              );
            })}
          </ScrollToBottom>
        </main>
        <div className="chat-form-container">
          <form id="chat-form">
            <input
              type="text"
              placeholder="Enter Message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
            />
            <button className="btn" onClick={(e) => sendMessage(e)}>
              <i className="fas fa-paper-plane"></i> Send
            </button>
          </form>
        </div>
      </div>
    </ChatCord>
  );
};

const ChatCord = styled.div`
  max-width: 1000px;
  max-height: 700px;
  background: #fff;
  margin: 30px auto;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  .chat-container {
    background: #fff;
  }

  .chat-header {
    background: #09aaaf;
    color: #fff;
    padding: 1.5rem;
    text-align: center;
  }

  .chat-main {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }

  .chat-sidebar {
    background: orange;
    color: #fff;
    padding: 20px 20px 60px;
    overflow-y: scroll;
  }

  .chat-sidebar h2 {
    font-size: 20px;
    background: rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 20px;
  }

  .chat-sidebar h3 {
    margin-bottom: 15px;
  }

  .chat-sidebar ul li {
    padding: 10px 0;
  }

  .chat-messages {
    padding: 30px;
    max-height: 500px;
    overflow-y: scroll;
  }

  .chat-messages .message {
    padding: 10px;
    margin-bottom: 15px;
    background-color: var(--light-color);
    border-radius: 5px;
  }

  .chat-messages .message .meta {
    font-size: 15px;
    font-weight: bold;
    color: var(--dark-color-b);
    opacity: 0.7;
    margin-bottom: 7px;
  }

  .chat-messages .message .meta span {
    color: #777;
  }

  .chat-form-container {
    padding: 20px 30px;
    background-color: var(--dark-color-a);
  }

  .chat-form-container form {
    display: flex;
  }

  .chat-form-container input[type="text"] {
    font-size: 16px;
    padding: 5px;
    height: 40px;
    flex: 1;
  }
`;

export default Chat;
