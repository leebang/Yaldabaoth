import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, activeItem: activeItem, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} activeItem={activeItem}/>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)