import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";

const SocketTest = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("CurrentTime", data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      <time dateTime={response}>{response}</time>
    </p>
  );
}

export default SocketTest;
