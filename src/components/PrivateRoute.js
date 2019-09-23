import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services/';

const PrivateRoute = ({render, ...rest}) => (

    <Route {...rest} render={props => {
        const userToken = authenticationService.getUserToken();
        if (!userToken) {
            return <Redirect to={{ pathname: '/login'}} />
        }

        return render({...props})
    }} />

);

export default PrivateRoute;