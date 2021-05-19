import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../api';
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
	}, []);

	return <p>{response.currentHighestBid}</p>;
};

export default SocketTest;
