import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { Modal, Button, Icon} from 'semantic-ui-react'

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

        this.state = { modalOpen: true, msg: this.props.message };
    }

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        const { alert } = this.props;
        return (
            <div>
                 {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Modal
                    open={alert.message && this.state.modalOpen}
                    basic
                    size='small'
                    handleClose = {this.handleClose}
                >
                    <Modal.Content>
                    <h3>{alert.message}</h3>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Got it
                    </Button>
                    </Modal.Actions>
                </Modal>
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
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