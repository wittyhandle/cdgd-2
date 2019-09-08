import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services/';

const PrivateRoute = ({component: Component, ...rest}) => (

    <Route {...rest} render={props => {
        const currentUser = authenticationService.getCurrentUser();
        if (!currentUser) {
            return <Redirect to={{ pathname: '/login'}} />
        }

        return <Component {...props} />
    }} />

);

export default PrivateRoute;