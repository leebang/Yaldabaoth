import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { UserSettingPage } from '../UserSettingPage';
import { MenuBar } from '../_components/MenuBar'
import { Segment } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
        this.state = {     
            activeItem: 'Home'
        }; 

    }

    handleTag = (activeItem) => {
        this.setState({activeItem: activeItem});
    }

    render() {
        const { alert } = this.props;
        const { activeItem } = this.state;
        return (
            <div>
                <Helmet>
                <style>{'body { background-color: rgb(27,28,29); }'}</style>
                </Helmet>
                <Router history={history}>
                    <Segment inverted>
                        <MenuBar value={localStorage.getItem('user')? true:false} msg={alert.message} onMenuBar={this.handleTag}/>
                        <PrivateRoute exact path="/" component={HomePage} msg={alert.message} menu={activeItem}/>
                        <Route path="/login" render={()=><LoginPage msg={alert.message} menu={activeItem} />}/>
                        <Route path="/register" render={()=><RegisterPage msg={alert.message}/>}/>
                        <Route path="/profile" render={()=><UserSettingPage msg={alert.message}/>}/>
                    </Segment>
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