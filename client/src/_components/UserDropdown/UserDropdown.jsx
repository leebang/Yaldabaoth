import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon, Button } from 'semantic-ui-react';


class UserDropdown extends Component {  
    render() {
        const trigger = (
            <span>
              <Icon name='user' /> Hello, {JSON.parse(localStorage.getItem('user')).username}
            </span>
          )
        return (
            <div>
                <Icon name='user outline' />
                <Dropdown trigger={trigger} pointing className='link item' >
                    <Dropdown.Menu>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item>
                        <Button secondary>
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