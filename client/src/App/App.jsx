import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Router } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { GameProfilePage } from '../GameProfilePage';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { UserSettingPage } from '../UserSettingPage';
import { PrivateRoute } from '../_components';
import { history } from '../_helpers';
import { MenuBar } from '../_components/MenuBar';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {     
            activeItem: 'Home'
        }; 
    }

    handleTag = (activeItem) => {
        this.setState({activeItem: activeItem});
    }

    render() {
        const { activeItem } = this.state;
        return (
            <div>
                <Helmet>
                <style>{'body { background-color: rgb(27,28,29); }'}</style>
                </Helmet>
                <Router history={history}>
                    <Segment inverted>
                        <MenuBar onMenuBar = {this.handleTag} />
                        <PrivateRoute exact path="/" component={HomePage} activeItem={activeItem} />
                        <Route path="/login" render={()=><LoginPage activeItem={activeItem} />} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/setting" component={UserSettingPage} />
                        <Route path="/gameprofile/:gameName" component={GameProfilePage}/>
                    </Segment>
                </Router>  
            </div>  
        );
    }
}

export { App as App };
 