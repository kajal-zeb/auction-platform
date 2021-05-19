import React, { useState, useEffect } from 'react';
import axios from 'axios';
const io = require('socket.io-client');
const ENDPOINT = 'http://localhost:3003';
const SocketTest = () => {
	const [response, setResponse] = useState({});

	useEffect(() => {
		const socket = io(ENDPOINT);
		socket.on('HighestBid', (data) => {
			console.log('Data > ', data);
			setResponse(data);
		});
    // return () => socket.disconnect();
	}, []);

	return (
		<p>
			{response.currentHighestBid}
		</p>
	);
};

export default SocketTest;
