import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Segment, Grid, Form, Button, Message, Card, Icon, Image, Input, Dimmer, Loader } from 'semantic-ui-react';
import {Helmet} from 'react-helmet';
import { authentication } from '../_reducers/authentication.reducer';

class UserProfilePage extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            curUser: this.props.users.item
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log("construcotr called");
    }

    componentDidMount() {
        let theUser = JSON.parse(localStorage.getItem('user'));
        this.props.dispatch(userActions.getOneUser(theUser._id));
        // this.setState({ curUser: this.props.users.item });
        // console.log("DidMount called");
    }

    componentWillReceiveProps(nextProps) {
        // console.log("WillReceiveProps Called");
        this.setState({ curUser: nextProps.users.item });
        // localStorage.setItem('user', JSON.stringify(this.state.curUser));
        // console.log("curUser -> " + this.state.curUser);

    }

    // shouldComponentUpdate(){
    //     const user = this.state.curUser;
    //     console.log("shouldComponentUpdate user: " + user);
    //     return JSON.stringify(user) !== "{}" ? false : true;
    // }

    handleChange(event) {
        const { name, value } = event.target;
        const { curUser } = this.state;
        this.setState({
            curUser: {
                ...curUser,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState( {submitted: true} );
        const { curUser } = this.state;
        const { dispatch } = this.props;
        // console.log(user);
        dispatch(userActions.updateUser(curUser));
        // window.location.reload();
    }

    render() {
        // users.items = this user
        // const user = this.props.users.item;
        const user = this.state.curUser;
        // console.log("render called");
        // console.log("users.item -> " + user);
        // console.log(user);
        // console.log("users.items -> " + users);
        return (
        <div>
            {user  ? 
            <Segment>
            <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column width={5} centered={"true"}>
                            <Card centered>
                                <Image src='../../../samples/sampleHead.png' />
                                <Card.Content>
                                <Card.Header> {user.nickName} </Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in {user.createdDate.substr(0,10)}</span>
                                </Card.Meta>
                                <Card.Description> {user.description} </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    {user.friendsList.length}
                                </a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>


                    <Grid.Column width={11}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field width={6}>
                        <label>Nickname</label>
                        <Input name="nickName" value={user.nickName} onChange={this.handleChange}/>
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
                        <input name="steamAccount" value={user.steamAccount} onChange={this.handleChange}/>
                        </Form.Field>

                        <Form.Field width={8}>
                        <label>Contact Infomation</label>
                        <input name="contactInfo"
                                placeholder='Contact'
                                value={user.contactInfo} 
                                onChange={this.handleChange} />
                        </Form.Field>

                        <Form.Field width={8}>
                        <label>About</label>
                            <input name='description'
                                   placeholder='Tell us more about you...' 
                                   value={user.description}
                                   onChange={this.handleChange}
                                        />
                        </Form.Field>
            
                        <Button type='submit'>Submit</Button>
                    </Form>
                    </Grid.Column>

                    </Grid.Row>
            </Grid>
            </Segment>
        
            :

            <Dimmer active inverted inline='centered'>
                <Loader size='large'>Loading</Loader>
            </Dimmer>
            
            }

        </div>
        );
    }
}

function mapStateToProps(state) {
    const { users } = state;
    return {
        users
    };
}

const connectedUserProfilePage = connect(mapStateToProps)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage };