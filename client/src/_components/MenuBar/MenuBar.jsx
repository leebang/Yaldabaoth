import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { LoginForm } from '../LoginForm'
import { UserDropdown } from '../UserDropdown'


class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {     
            activeItem: 'Home'
        }; 
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;
        return (
            <div>
                <Menu inverted pointing>
                    <Menu.Item 
                        name='Home' 
                        active={activeItem === 'Home'} 
                        onClick={this.handleItemClick} 
                    />
                    <Menu.Item
                        name='Games'
                        active={activeItem === 'Games'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Friends'
                        active={activeItem === 'Friends'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        {this.props.value ? <UserDropdown /> : <LoginForm />}
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

export { MenuBar as MenuBar }; 