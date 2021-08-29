import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const JoinChat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <ChatContainer>
      <Chat>
        <ChatCord>
          <div className="join-container">
            <h1>Chat Chatter</h1>
            <main className="join-main">
              <form>
                <div className="form-control">
                  <label htmlFor="username">Name</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter username..."
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="room">Rooms</label>
                  <select
                    name="room"
                    id="room"
                    onChange={(e) => setRoom(e.target.value)}
                  >
                    <option value="select project">Select Room</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="C#">C#</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Java">Java</option>
                  </select>
                </div>
                <Link
                  onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                  to={`/chat?name=${name}&room=${room}`}
                  type="submit"
                >
                  <button type="submit" className="btn">
                    Join Chat
                  </button>
                </Link>
              </form>
            </main>
          </div>
        </ChatCord>
      </Chat>
    </ChatContainer>
  );
};

const ChatContainer = styled.div``;

const Chat = styled.div``;

const ChatCord = styled.div`
  .join-container {
    max-width: 60rem;
    margin: 8rem auto;
    color: #fff;

    h1 {
      text-align: center;
      padding: 1.5rem 4rem;
      background: #b9babd;
      color: #fff;
      font-size: 3rem;
      font-weight: bold;
    }
  }

  .join-main {
    padding: 3rem 4rem;
    background: #1a2238;
  }

  .join-main p {
    margin-bottom: 2rem;
  }

  .join-main .form-control {
    margin-bottom: 2rem;
    background: #1a2238;
    border: none;
    color: #fff;
  }

  .join-main label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  .join-main input[type="text"] {
    font-size: 1.6rem;
    padding: 0.5rem;
    height: 4rem;
    width: 100%;
  }

  .join-main select {
    font-size: 1.6rem;
    padding: 0.5rem;
    height: 4rem;
    width: 100%;
  }

  button.btn {
    margin-top: 2rem;
    width: 100%;
    background: #445277;
    color: #fff;
    padding: 1rem 0;
    cursor: pointer;
  }

  @media (max-width: 700px) {
    .chat-main {
      display: block;
    }

    .chat-sidebar {
      display: none;
    }
  }
`;

export default JoinChat;
