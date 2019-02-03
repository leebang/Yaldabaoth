import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, msg: Msg, menu: Menu, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component msg={Msg} menu={Menu} {...props}/>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)