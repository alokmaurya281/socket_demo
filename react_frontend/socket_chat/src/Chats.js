import React, { useEffect, useState } from "react";

const Chats = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        username: username,
        message: message,
        time:
          new Date(Date.now()).getDate() +
          "/" +
          new Date(Date.now()).getMonth() +
          "/" +
          new Date(Date.now()).getFullYear() +
          " " +
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };
      await socket.emit("send_message", messageData);
      const messages = document.getElementById("messages");
      const m = `${messageData.message} Sent at ${messageData.time}`;
      messages.append(m);
    }
  };
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      const messages = document.getElementById("messages");
      const m = `${data.message} Recieved at ${data.time}`;
      messages.append(m);
      console.log(data);
    });
  }, [socket]);
    return (
      <div className="App">
        <br />
        <div className="">Chat with Having room id {room}</div>
        <br />
        <div id="messages"></div>
        <div>
          <input
            type="text"
            placeholder="Enter message"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    );
  
};

export default Chats;
