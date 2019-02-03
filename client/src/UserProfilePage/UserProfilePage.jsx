import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Segment, Grid, Form, Button, Message, Card, Icon, Image, Input } from 'semantic-ui-react';
import {Helmet} from 'react-helmet';
import { authentication } from '../_reducers/authentication.reducer';


class UserProfilePage extends Component { 
    constructor(props) {
        super(props);

        let theUser = JSON.parse(localStorage.getItem('user'));
        this.props.dispatch(userActions.getOneUser(theUser._id));
        this.state = {
            user: this.props.user,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount(){
    //     let theUser = JSON.parse(localStorage.getItem('user'));
    //     this.props.dispatch(userActions.getOneUser(theUser._id));
    // }

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
        console.log(user);
        dispatch(userActions.updateUser(user));
        localStorage.setItem('user', JSON.stringify(user));
    }


    render() {
        // const { auser } = this.props;
        // console.log(auser);
        // users.items = this user
        const { users } = this.props;
        return (
        <div>
            <Segment>
            <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column width={5} centered={"true"}>
                            <Card centered>
                                <Image src='../../../samples/sampleHead.png' />
                                <Card.Content>
                                <Card.Header> {users.items ? users.items.nickName:''} </Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in {users.items ? users.items.createdDate.substr(0,10):''}</span>
                                </Card.Meta>
                                <Card.Description> {users.items ? users.items.description:''} </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    {users.items ? users.items.friendsList.length:''}
                                </a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                    <Grid.Column width={11}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field width={6}>
                        <label>Nickname</label>
                        <Input name="nickName" value={users.items ? users.items.nickName : ''} onChange={this.handleChange}/>
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
                        <input name="steamAccount" value={users.items ? users.items.steamAccount : ''} onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field width={8}>
                        <label>Contact Infomation</label>
                        <input name="contactInfo"
                                placeholder='Contact'
                                value={users.items ? users.items.contactInfo : ''} 
                                onChange={this.handleChange} />
                        </Form.Field>

                        <Form.Field width={8}>
                        <label>About</label>
                            <input name='description'
                                   placeholder='Tell us more about you...' 
                                   value={users.items ? users.items.description : ''}
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
    const { users } = state;
    // const { user } = user;
    return {
        users
    };
}

const connectedUserProfilePage = connect(mapStateToProps)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage };