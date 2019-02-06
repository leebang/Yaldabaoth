import React, { Component } from 'react'
import { Menu, Label, Image, Input, Grid, Segment, Card, Dimmer, Loader } from 'semantic-ui-react'
import { gameActions } from '../../_actions';
import { connect } from 'react-redux';

class GameCards extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <div>
                <Card.Group itemsPerRow={4}>
                        {this.props.games.map((g) =>
                            <Card key={g.gameName}>
                                <Image src={g.imgLogoUrl=="" ? "" : g.imgLogoUrl} />
                                <Card.Content>
                                <Card.Header>{g.gameName}</Card.Header>
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

    componentDidMount() {
        this.props.dispatch(gameActions.getAllGames());
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state;
        const { games } = this.props;
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
                    {games.items ? 
                    <Segment>
                        {activeItem=='mine' && <GameCards games={games.items}/>}
                        {activeItem=='explore' && <GameCards games={games.items}/>}
                    </Segment>
                    :
                    <Dimmer active inverted inline='centered'>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                    }
                </Grid.Column>
            </Grid>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { games } = state;
    return {
        games
    };
}

const connectedGamesContent = connect(mapStateToProps)(GamesContent);
export { connectedGamesContent as GamesContent }; 