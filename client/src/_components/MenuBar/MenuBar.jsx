import React, { Component } from 'react'
import { Menu, Icon, Image } from 'semantic-ui-react'
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
        const { value, msg } = this.props; //value=true login value=false not login
        return (
            <div>
                <Menu inverted stackable icon='labeled' size='small'>
                    <Menu.Item>
                        <Image src='../../../samples/temp.png' size='mini' />
                    </Menu.Item>
                    <Menu.Item 
                        name='Home' 
                        active={activeItem === 'Home'} 
                        onClick={this.handleItemClick} 
                    >
                    <Icon name='home' />
                    Home
                    </Menu.Item>
                    <Menu.Item
                        name='Games'
                        active={activeItem === 'Games'}
                        onClick={this.handleItemClick}
                    >
                    <Icon name='gamepad' />
                    Games
                    </Menu.Item>
                    <Menu.Item
                        name='Friends'
                        active={activeItem === 'Friends'}
                        onClick={this.handleItemClick}
                    >
                    <Icon name='users' />
                    Friends
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        {value ? <UserDropdown /> : <LoginForm msg={msg}/>}
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

export { MenuBar as MenuBar }; 