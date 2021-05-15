import React from 'react';
import SocketTest from './socket';
import { ParentWrapper } from './components/organisms'

const App = () => {
	return (
		<>
			<ParentWrapper/>
			<SocketTest />
		</>
	);
};

export default App;
