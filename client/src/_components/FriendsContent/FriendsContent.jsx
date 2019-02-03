import React, { Component } from 'react'
import { Menu, Label, Image, Input, Grid, Segment, Card, Container } from 'semantic-ui-react'

class UserCards extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const src1 = '../../../samples/sampleHead.png';
        const myfriends=[{name:'Noob',image:src1},
                        {name:'Noob',image:src1},
                        {name:'Noob',image:src1},
                        {name:'Noob',image:src1},
                        {name:'Noob',image:src1},
                        {name:'Noob',image:src1},];
        return (
            <div>
                <Card.Group itemsPerRow={4}>
                        {myfriends.map((f) =>
                            <Card>
                                <Image src={f.image} />
                                <Card.Content>
                                <Card.Header>{f.name}</Card.Header>
                                </Card.Content>
                            </Card>
                        )}
                </Card.Group>
            </div>
        );
    }
}


class FriendsContent extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: 'mine' }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state;
        return (
            <div>
            <Grid>
                <Grid.Column width={3}>
                    <Menu vertical>
                        <Menu.Item name='mine' active={activeItem === 'mine'} onClick={this.handleItemClick}>
                        <Label color='teal'>1</Label>
                        My Friends
                        </Menu.Item>

                        <Menu.Item name='requests' active={activeItem === 'requests'} onClick={this.handleItemClick}>
                        <Label>51</Label>
                        Friends Request
                        </Menu.Item>

                        <Menu.Item>
                        <Input icon='search' placeholder='Search friends...' />
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Segment>
                        {activeItem=='mine' && <UserCards />}
                        {activeItem=='requests' && <UserCards />}
                    </Segment>
                </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export { FriendsContent as FriendsContent }; 