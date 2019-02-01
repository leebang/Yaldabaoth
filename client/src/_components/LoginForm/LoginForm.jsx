import React, { Component } from 'react'
import { Button, Modal, Form, Message } from 'semantic-ui-react'
import { userActions } from '../../_actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class LoginForm extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false,
            modalOpen: false
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

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })


    render() {
        const { loggingIn, msg } = this.props;
        const { username, password, submitted} = this.state;
        return (
            <div>
                <p></p>
                <Modal size={'mini'} trigger={<Button secondary size='big' 
                onClick={this.handleOpen}>Login or Sign up</Button>} 
                open={this.state.modalOpen}
                onClose={this.handleClose}>
                    <Modal.Header>Welcome!</Modal.Header>
                    <Modal.Content>
                    <Modal.Description>
                    {msg &&
                        <Message color={msg=='Registration successful' ? 'green' : 'red'}>{msg}</Message>}
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
                            <Button.Group>
                                <Button color={'blue'} loading={loggingIn ? true : false} >Login</Button>
                                <Button.Or />
                                <Button color={'red'} as={Link} to="/register" onClick={this.handleClose}>Register</Button>
                            </Button.Group>
                    </Form>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
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

const connectedLoginForm = connect(mapStateToProps)(LoginForm);
export { connectedLoginForm as LoginForm }; 