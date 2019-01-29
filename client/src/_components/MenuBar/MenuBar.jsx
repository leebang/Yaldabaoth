import React, { Component } from 'react'
import { Menu, Button, Modal, Form } from 'semantic-ui-react'
import { userActions } from '../../_actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MenuBar extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false,
            activeItem: 'Home'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted, activeItem} = this.state;
        return (
            <div>
                <Menu inverted pointing>
                <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
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
                    <Modal size={'mini'} trigger={<Button secondary>Login</Button>} open={localStorage.getItem('user') ? false : true}>
                        <Modal.Header>Login</Modal.Header>
                        <Modal.Content>
                        <Modal.Description>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                {submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                }
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </Form.Field>
                                <Button basic loading={loggingIn ? true : false}>
                                    Login
                                </Button>
                                <Link to="/register">Register</Link>
                        </Form>
                        </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedMenuBar = connect(mapStateToProps)(MenuBar);
export { connectedMenuBar as MenuBar }; 