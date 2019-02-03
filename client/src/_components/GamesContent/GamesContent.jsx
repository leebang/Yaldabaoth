import React, { Component } from 'react'
import { Menu, Label, Image, Input, Grid, Segment, Card, Container } from 'semantic-ui-react'

class GameCards extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const src = '../../../samples/image.jpg';
        const mygames=[{name:'Witcher3',image:src},
                        {name:'Witcher3',image:src},
                        {name:'Witcher3',image:src},
                        {name:'Witcher3',image:src},
                        {name:'Witcher3',image:src},
                        {name:'Witcher3',image:src},];
        return (
            <div>
                <Card.Group itemsPerRow={4}>
                        {mygames.map((g) =>
                            <Card>
                                <Image src={g.image} />
                                <Card.Content>
                                <Card.Header>{g.name}</Card.Header>
                                </Card.Content>
                            </Card>
                        )}
                </Card.Group>
            </div>
        );
    }
}


class GamesContent extends Component {
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
                        {activeItem=='mine' && <GameCards />}
                        {activeItem=='explore' && <GameCards />}
                    </Segment>
                </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export { GamesContent as GamesContent }; 