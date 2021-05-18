import React, { useState, useEffect } from 'react';
import axios from 'axios';
const io = require('socket.io-client');
const ENDPOINT = 'http://localhost:3003';
const SocketTest = () => {
	const [response, setResponse] = useState('');

	useEffect(() => {
		const socket = io('http://65.2.79.23');
		socket.on('CurrentDate', (data) => {
			console.log('Data > ', data);
			setResponse(data);
		});
    return () => socket.disconnect();
	}, []);

	return (
		<p>
			<time dateTime={response}>{response}</time>
		</p>
	);
};

export default SocketTest;
