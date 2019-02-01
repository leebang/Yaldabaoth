import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon, Button } from 'semantic-ui-react';
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
        const trigger = (
            <span>
              <Icon name='user' /> Hello, {JSON.parse(localStorage.getItem('user')).username}
            </span>
          )
        return (
            <div>
                <p></p>
                <Dropdown trigger={trigger} pointing className='link item' >
                    <Dropdown.Menu>
                        <Dropdown.Item as={ Link } to='/profile'>Profile</Dropdown.Item>
                        <Dropdown.Item>
                        <Button secondary onClick={this.handleLogout}>
                            <Link to="/login" style={{color:'white'}}>Logout</Link>
                        </Button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}




export { UserDropdown as UserDropdown }; 