import React from 'react';
import SocketTest from './socket';
import Sprite from './components/atoms/Sprite/Sprite';

const App = () => {
	return (
		<>
			<div>
				<p>Welcome to Bitcoin Pizza...</p>
			</div>
			<SocketTest />
		</>
	);
};

export default App;
