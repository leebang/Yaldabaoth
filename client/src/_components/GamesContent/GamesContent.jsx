import React, { Component } from 'react'
import { Menu, Label, Image, Input, Grid, Segment, Card, Container } from 'semantic-ui-react'

class GamesContent extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: 'mine' }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state;
        const src = '../../../samples/image.jpg';
        return (
            <div>
            <Grid>
                <Grid.Column width={3}>
                    <Menu vertical>
                        <Menu.Item name='mine' active={activeItem === 'mine'} onClick={this.handleItemClick}>
                        My Games
                        </Menu.Item>

                        <Menu.Item name='explore' active={activeItem === 'explore'} onClick={this.handleItemClick}>
                        Explore Games
                        </Menu.Item>

                        <Menu.Item>
                        <Input icon='search' placeholder='Search games...' />
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Segment>
                        <Card.Group itemsPerRow={4}>
                        <Card>
                            <Image src={src} />
                            <Card.Content>
                            <Card.Header>Witcher 3</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src={src} />
                            <Card.Content>
                            <Card.Header>Witcher 3</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src={src} />
                            <Card.Content>
                            <Card.Header>Witcher 3</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src={src} />
                            <Card.Content>
                            <Card.Header>Witcher 3</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src={src} />
                            <Card.Content>
                            <Card.Header>Witcher 3</Card.Header>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src={src} />
                            <Card.Content>
                            <Card.Header>Witcher 3</Card.Header>
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

export { GamesContent as GamesContent }; 