import React, { useState, useEffect } from 'react';
import { ENV_CONFIG } from '../config';
const io = require('socket.io-client');
const SocketTest = () => {
  const [response, setResponse] = useState({});
  useEffect(() => {
    const socket = io(ENV_CONFIG.BASE_URL);
    socket.on('HighestBid', (data) => {
      console.log('Data > ', data);
      setResponse(data);
    });
    // return () => socket.disconnect();
    const eg = {
      bidMessage: '1700 Satoshi ki kimat tum kya jaano Fiat babu!',
      currentHighestBid: '1700.00',
      eventEndTime: '2021-05-22T01:00:00.000Z',
      highestBidderId: 1,
      highestBidderName: 'Kajal',
      bidBracket: [500, 1000, 1500],
    };
    localStorage.setItem('currentbid', JSON.stringify(eg));
  }, []);

  return <p>{response.currentHighestBid}</p>;
};

export default SocketTest;
