import React from 'react';
import SocketTest from './socket';
import { ParentWrapper } from './components/organisms'
import "./index.css";
const App = () => {
	return (
		<div style={{maxWidth:'600px'}}>
			<ParentWrapper/>
			<SocketTest />
		</div>
	);
};

export default App;
