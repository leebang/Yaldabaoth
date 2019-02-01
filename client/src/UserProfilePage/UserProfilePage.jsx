import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Segment, Grid, Form, Button, Message, Card, Icon, Image } from 'semantic-ui-react';
import {Helmet} from 'react-helmet';


class UserProfilePage extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            user: {
                nickname: '',
                username: '',
                password: '',
                steamAccount: '',
                description: '',
                contactInfo: ''
            },
            submitted: false
        };

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    render() {
        return (
        <div>
            <Segment>
            <Grid divided='vertically' celled>

                    <Grid.Row columns={2}>
                        <Grid.Column width={5} centered>
                            <Card centered>
                                <Image src='../../../samples/sampleHead.png' />
                                <Card.Content>
                                <Card.Header>Matthew</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    22 Friends
                                </a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                    <Grid.Column width={11}>
                    <Form>
                        <Form.Field>
                        <label>Nickname</label>
                        <input placeholder='Nickname' />
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

                        <Form.Field>
                        <label>Steam Account</label>
                        <input placeholder='Account Number' />
                        </Form.Field>

                        <Form.Field>
                        <label>Contact Infomation</label>
                        <input placeholder='eg. Phone' />   
                        </Form.Field>

                        <Form.TextArea label='About' placeholder='Tell us more about you...' />
                        
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


export { UserProfilePage as UserProfilePage }; 