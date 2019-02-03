import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon, Button, Segment } from 'semantic-ui-react';
import { userActions } from '../../_actions';


class UserDropdown extends Component {  
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    render() {
        return (
            <div>
                <p></p>
                <Segment inverted>
                <Icon name='user' />
                <Dropdown inline text={JSON.parse(localStorage.getItem('user')).nickName} pointing='top left'>
                    <Dropdown.Menu>
                        <Dropdown.Item as={ Link } to='/profile'>Profile</Dropdown.Item>
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




export { UserDropdown as UserDropdown }; 