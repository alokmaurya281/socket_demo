import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chats from "./Chats";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
      {!showChat ? (
        <div className="App">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="room Id"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chats socket={socket} username={username} room={room} />
      )}
    </>
  );
}

export default App;
