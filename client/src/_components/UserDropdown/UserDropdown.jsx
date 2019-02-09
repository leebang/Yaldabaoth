import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon, Button, Segment } from 'semantic-ui-react';
import { userActions } from '../../_actions';
import { connect } from 'react-redux';

class UserDropdown extends Component {  
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        this.props.dispatch(userActions.logout());
    }

    render() {
        const { authentication } = this.props;
        return (
            <div>
                <Segment inverted>
                <Icon name='user' />
                <Dropdown inline text={authentication.user.nickName} pointing='top left'>
                    <Dropdown.Menu>
                        <Dropdown.Item as={ Link } to='/setting'>Settings</Dropdown.Item>
                        <Dropdown.Item>
                        <Button secondary onClick={this.handleLogout}>
                            <Link to="/login" style={{color:'white'}}>Logout</Link>
                        </Button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication
    };
}

const connectedUserDropdown = connect(mapStateToProps)(UserDropdown);
export { connectedUserDropdown as UserDropdown }; 