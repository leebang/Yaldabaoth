import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../_actions';
import { Segment, Image, Button, Icon, Grid, Menu, Input, Item, Statistic } from 'semantic-ui-react';

class GameProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = { activeItem: 'People Who Played' }
    }

    componentDidMount() {
        this.props.dispatch(gameActions.getByName(this.props.match.params.gameName));
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render () {
        const { games } = this.props;
        const { activeItem } = this.state;
        return (
            <div>
                {games.item ?
                
                <div>
                    <Grid centered>
                        <Grid.Column computer={4} mobile={8} largeScreen={4} widescreen={4} tablet={6}>
                            <Segment>
                                <Image src={games.item.imgLogoUrl=="" ? no_image : games.item.imgLogoUrl} size='medium'/>
                            </Segment>
                            <Segment textAlign={'center'}>
                                <h1>{games.item.gameName}</h1>
                                <Statistic>
                                    <Statistic.Value>{Math.floor(games.item.playTime/60)}</Statistic.Value>
                                    <Statistic.Label>Hours Played</Statistic.Label>
                                </Statistic>
                                <p></p>
                                <Button animated color={'blue'} size='mini' href={games.item.url}>
                                    <Button.Content visible>
                                    <Image src={games.item.imgIconUrl=="" ? no_image : games.item.imgIconUrl} avatar />
                                    <span>View On Steam</span>
                                    </Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                            </Segment>
                        </Grid.Column>

                        <Grid.Column computer={12} mobile={16} largeScreen={12} widescreen={12} tablet={16}>
                            <Segment>
                                <Menu attached='top' tabular>
                                    <Menu.Item name='People Who Played' active={activeItem === 'People Who Played'} onClick={this.handleItemClick} />
                                    <Menu.Item
                                        name='Achievements'
                                        active={activeItem === 'Achievements'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Menu position='right'>
                                        <Menu.Item>
                                        <Input
                                            transparent
                                            icon={{ name: 'search', link: true }}
                                            placeholder='Search users...'
                                        />
                                        </Menu.Item>
                                    </Menu.Menu>
                                </Menu>
                                
                                <Segment attached='bottom'>
                                <Item.Group>
                                    <Item>
                                    <Item.Image size='tiny' src={games.item.imgLogoUrl=="" ? no_image : games.item.imgLogoUrl} />
                                    <Item.Content>
                                        <Item.Header as='a'>{games.item.userList[0]}</Item.Header>
                                        <Item.Meta>Description</Item.Meta>
                                        <Item.Description>
                                        some Description
                                        </Item.Description>
                                        <Item.Extra>Additional Details</Item.Extra>
                                    </Item.Content>
                                    </Item>
                                </Item.Group>
                                </Segment>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
                :""
                }
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

const connectedGameProfilePage = connect(mapStateToProps)(GameProfilePage);
export { connectedGameProfilePage as GameProfilePage };
