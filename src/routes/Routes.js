import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';
import Login from '../components/organisms/Login/Login';
import ParentWrapper from '../components/organisms/ParentWrapper';

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/login' component={Login} />
			<PrivateRoute exact path='/' component={ParentWrapper} />
		</Switch>
	);
};

export default memo(Routes);
