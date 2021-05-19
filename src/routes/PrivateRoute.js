import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...props }) => {
	let isAuthenticated = false;
	if (!localStorage.getItem('USER')) isAuthenticated = false;
	else {
		const user = JSON.parse(localStorage.getItem('USER'));
		isAuthenticated = !!user;
	}
	return (
		<Route
			{...props}
			render={(innerProps) =>
				isAuthenticated ? (
					<Component {...innerProps} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};

export default PrivateRoute;
