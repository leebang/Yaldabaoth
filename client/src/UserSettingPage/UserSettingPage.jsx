import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Segment, Grid, Form, Button, Message, Card, Icon, Image, Input, Dimmer, Loader } from 'semantic-ui-react';
import { authentication } from '../_reducers/authentication.reducer';

class UserSettingPage extends Component { 
    constructor(props) {
        super(props);
        
        this.state = {
            userId: JSON.parse(localStorage.getItem('user'))._id,
            submitted: false,
            curUser: this.props.users.item
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(userActions.getOneUser(this.state.userId));
    }

    componentWillReceiveProps(nextProps) {
        console.log("will receive props(nextprops.user.item)");
        var newUser = nextProps.users.item;
        if(newUser){
            Object.keys(newUser).map(function(key,index){
                if(key=='password'||key=='newPassword'||key=='newPasswordCompare'){
                    newUser[key]='';
                }
            });
        }
        this.setState({ curUser: newUser });
    }

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
        // TODO:
        // hash password in front end before send to db

        event.preventDefault();
        this.setState( {submitted: true} );
        const { curUser } = this.state;
        const { dispatch } = this.props;
        console.log(curUser);
        dispatch(userActions.updateUser(curUser));
        
    }

    render() {
        const user = this.state.curUser;
        const { submitted } = this.state; 
        const { msg } = this.props;
        return (
        <div>
            {user ? 
            <Segment>
            <Grid divided='vertically'>
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
                        <Input name="password" onChange={this.handleChange} placeholder='Old Password'/>
                        </Form.Field>
                        <Form.Field>
                        <label>New Password</label>
                        <Input name="newPassword" onChange={this.handleChange} placeholder='New Password' />
                        </Form.Field>
                        <Form.Field>
                        <label>New Password</label>
                        <input name="newPasswordCompare" onChange={this.handleChange} placeholder='New Password'/>
                        </Form.Field>
                        </Form.Group>

                        {msg &&
                        <Message color='yellow' header='Password Error'>{msg}</Message>}

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

const connectedUserSettingPage = connect(mapStateToProps)(UserSettingPage);
export { connectedUserSettingPage as UserSettingPage };