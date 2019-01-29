import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Segment, Grid, Form, Button} from 'semantic-ui-react';
import {Helmet} from 'react-helmet';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
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
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div>
            <Helmet>
                <style>{'body { background-color: black; }'}</style>
            </Helmet>
            <Grid centered columns={2}>
            <Grid.Row></Grid.Row>
                <Grid.Column>
                    <Segment inverted color='black'>
                        <h1>Register</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label htmlFor="firstName" style={{color:'white'}}>First Name</label>
                                <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                {submitted && !user.firstName &&
                                    <div className="help-block">First Name is required</div>
                                }
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="lastName" style={{color:'white'}}>Last Name</label>
                                <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                                {submitted && !user.lastName &&
                                    <div className="help-block">Last Name is required</div>
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