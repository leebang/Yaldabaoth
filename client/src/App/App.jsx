import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { UserProfilePage } from '../UserProfilePage';
import { MenuBar } from '../_components/MenuBar'

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <Router history={history}>
                    <div>
                        <MenuBar value={localStorage.getItem('user')? true:false} msg={alert.message} />
                        <PrivateRoute exact path="/" component={HomePage} msg={alert.message} />
                        <Route path="/login" render={()=><LoginPage msg={alert.message}/>}/>
                        <Route path="/register" render={()=><RegisterPage msg={alert.message}/>}/>
                        <Route path="/profile" render={()=><UserProfilePage/>}/>
                    </div>
                </Router>  
            </div>  
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 