import React from 'react';
import { ParentWrapper } from './components/organisms'
import { useHistory, withRouter } from 'react-router-dom';
import "./index.css";
const App = () => {
	return (
		<div style={{maxWidth:'600px'}}>
			<ParentWrapper/>
		</div>
	);
};

export default App;
