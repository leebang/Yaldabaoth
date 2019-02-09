import React, { Component } from 'react'
import { Menu, Icon, Image, Segment } from 'semantic-ui-react'
import { LoginForm } from '../LoginForm'
import { UserDropdown } from '../UserDropdown'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import website_icon from '../../../samples/temp.png';

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {     
            activeItem: 'Home'
        }; 
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        this.props.onMenuBar(name); 
    }

    render() {
        const { activeItem } = this.state;
        const { authentication } = this.props;
        return (
            <div>
                <Segment inverted>
                <Menu inverted stackable icon='labeled' size='small' secondary widths={6}>
                    <Menu.Item fitted >
                        <Image src={website_icon} href="/" />
                    </Menu.Item>
                    <Menu.Item 
                        name='Home' 
                        active={activeItem === 'Home'} 
                        onClick={this.handleItemClick}
                        as={Link} to='/'
                    >
                    <Icon name='home' />
                    Home
                    </Menu.Item>
                    <Menu.Item
                        name='Games'
                        active={activeItem === 'Games'}
                        onClick={this.handleItemClick} 
                        as={Link} to='/'
                    >
                    <Icon name='gamepad' />
                    Games
                    </Menu.Item>
                    <Menu.Item
                        name='Friends'
                        active={activeItem === 'Friends'}
                        onClick={this.handleItemClick}
                        as={Link} to='/'
                    >
                    <Icon name='users' />
                    Friends
                    </Menu.Item>
                    <Menu.Item
                        name='Radar'
                        active={activeItem === 'Radar'}
                        onClick={this.handleItemClick}
                        as={Link} to='/'
                    >
                    <Icon name='map marker alternate' />
                    Radar
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        {authentication.loggedIn ? <UserDropdown /> : <LoginForm />}
                    </Menu.Menu>
                </Menu>
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

const connectedMenuBar = connect(mapStateToProps)(MenuBar);
export { connectedMenuBar as MenuBar }; 