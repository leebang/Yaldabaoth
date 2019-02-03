import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Segment, Grid, Form, Button, Message, Card, Icon, Image, Input } from 'semantic-ui-react';
import {Helmet} from 'react-helmet';


class UserProfilePage extends Component { 
    constructor(props) {
        super(props);

        let theUser = JSON.parse(localStorage.getItem('user'));
        
        this.state = {
            user: {
                _id: theUser._id,
                nickName: theUser.nickName,
                username: theUser.username,
                password: '',
                steamAccount: theUser.steamAccount,
                description: theUser.description,
                contactInfo: theUser.contactInfo,
                createdDate: theUser.createdDate,
                friendsList: theUser.friendsList
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
        this.setState( {submitted: true} );
        const { user } = this.state;
        const { dispatch } = this.props;
        dispatch(userActions.updateUser(user));
    }


    render() {
        return (
        <div>
            <Segment>
            <Grid divided='vertically'>

                    <Grid.Row columns={2}>
                        <Grid.Column width={5} centered={"true"}>
                            <Card centered>
                                <Image src='../../../samples/sampleHead.png' />
                                <Card.Content>
                                <Card.Header> {this.state.user.nickName} </Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in {this.state.user.createdDate.substr(0,10)}</span>
                                </Card.Meta>
                                <Card.Description> {this.state.user.description} </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    {this.state.user.friendsList.length}
                                </a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                    <Grid.Column width={11}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field width={6}>
                        <label>Nickname</label>
                        <Input name="nickName" value={this.state.user.nickName} onChange={this.handleChange}/>
                        </Form.Field>
                        
                        <Form.Group>
                        <Form.Field>
                        <label>Old Password</label>
                        <input placeholder='Old Password' />
                        </Form.Field>
                        <Form.Field>
                        <label>New Password</label>
                        <input placeholder='New Password' />
                        </Form.Field>
                        <Form.Field>
                        <label>New Password</label>
                        <input placeholder='New Password' />
                        </Form.Field>
                        </Form.Group>

                        <Form.Field width={6}>
                        <label>Steam Account</label>
                        <input name="steamAccount" value={this.state.user.steamAccount} onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field width={8}>
                        <label>Contact Infomation</label>
                        <input name="contactInfo"
                                placeholder='Contact'
                                value={this.state.user.contactInfo} 
                                onChange={this.handleChange} />
                        </Form.Field>

                        <Form.Field width={8}>
                        <label>About</label>
                            <input name='description'
                                   placeholder='Tell us more about you...' 
                                   value={this.state.user.description}
                                   onChange={this.handleChange}
                                        />
                        </Form.Field>
            
                        <Button type='submit'>Submit</Button>
                    </Form>
                    </Grid.Column>

                    </Grid.Row>
            </Grid>
            </Segment>
        </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

const connectedUserProfilePage = connect(mapStateToProps)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage };