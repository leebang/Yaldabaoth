import React, { Component } from 'react'
import { Menu, Label, Image, Input, Grid, Segment, Card, Container } from 'semantic-ui-react'

class FriendsContent extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: 'mine' }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state;
        const src1 = '../../../samples/sampleHead.png';
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
                        <Card.Group itemsPerRow={4}>
                        <Card>
                            <Image src={src1} />
                            <Card.Content>
                            <Card.Header>Noob</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src={src1} />
                            <Card.Content>
                            <Card.Header>Noob</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src={src1} />
                            <Card.Content>
                            <Card.Header>Noob</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src={src1} />
                            <Card.Content>
                            <Card.Header>Noob</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src={src1} />
                            <Card.Content>
                            <Card.Header>Noob</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src={src1} />
                            <Card.Content>
                            <Card.Header>Noob</Card.Header>
                            </Card.Content>
                        </Card>
                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export { FriendsContent as FriendsContent }; 