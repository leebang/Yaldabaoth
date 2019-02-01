import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, msg: Msg, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component msg={Msg} {...props}/>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)