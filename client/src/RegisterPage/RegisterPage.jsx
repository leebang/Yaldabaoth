import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import { userActions } from '../_actions';



class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                nickName: '',
                username: '',
                password: '',
                steamAccount: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.nickName && user.username && user.password && user.steamAccount) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering, msg } = this.props;
        const { user, submitted } = this.state;
        return (
            <div>
            <Grid centered columns={2}>
            <Grid.Row></Grid.Row>
                <Grid.Column>
                    <Segment inverted color='black'>
                        {msg &&
                        <Message color='red'>{msg && msg!='Username or password is incorrect'}</Message>}
                        <h1>Register</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label htmlFor="nickName" style={{color:'white'}}>Nickname</label>
                                <input type="text" className="form-control" name="nickName" value={user.nickName} onChange={this.handleChange} />
                                {submitted && !user.nickName &&
                                    <div className="help-block">Nickname is required</div>
                                }
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="username" style={{color:'white'}}>Username</label>
                                <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                                {submitted && !user.username &&
                                    <div className="help-block">Username is required</div>
                                }
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="steamAccount" style={{color:'white'}}>Steam Account</label>
                                <input type="text" className="form-control" name="steamAccount" value={user.steamAccount} onChange={this.handleChange} />
                                {submitted && !user.steamAccount &&
                                    <div className="help-block">Steam account is required</div>
                                }
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="password" style={{color:'white'}}>Password</label>
                                <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                                {submitted && !user.password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </Form.Field>
                            <Form.Field>
                                <Button.Group>
                                    <Button color={'blue'} loading={registering ? true : false}>Register</Button>
                                    <Button.Or />
                                    <Button color={'red'} as={Link} to="/login">Cancel</Button>
                                </Button.Group>
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
