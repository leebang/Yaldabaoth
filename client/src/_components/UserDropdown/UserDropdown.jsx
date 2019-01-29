import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Button } from 'semantic-ui-react';


class UserDropdown extends Component {  
    render() {
        return (
            <div> 
                <Dropdown text={JSON.parse(localStorage.getItem('user')).username} pointing className='link item' >
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