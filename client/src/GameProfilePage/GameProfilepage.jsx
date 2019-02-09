import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../_actions';
import { Segment, Image, Button, Icon } from 'semantic-ui-react';

class GameProfilePage extends Component {

    componentDidMount() {
        this.props.dispatch(gameActions.getByName(this.props.match.params.gameName));
    }

    render () {
        const { gameName } = this.props.match.params;
        const { games } = this.props;
        return (
            <div>
                {games.item ?
                
                <div>
                    <Segment floated='left' circular style={square}>
                        <Image src={games.item.imgLogoUrl=="" ? no_image : games.item.imgLogoUrl} size='medium'/>
                        <p>{games.item.gameName}</p>
                        <p>{games.item.playTime}</p>

                        <Button animated color={'blue'} size='mini'>
                        <Button.Content visible>
                        <Image src={games.item.imgIconUrl=="" ? no_image : games.item.imgIconUrl} avatar href={games.item.url} />
                        <span>View On Steam</span>
                        </Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                        </Button>
                    </Segment>
                    <Segment floated='right'>
                    <Image src={games.item.imgLogoUrl=="" ? no_image : games.item.imgLogoUrl} size='medium'/>
                        <p>{games.item.gameName}</p>
                        <p>{games.item.playTime}</p>

                        <Button animated color={'blue'} size='mini'>
                        <Button.Content visible>
                        <Image src={games.item.imgIconUrl=="" ? no_image : games.item.imgIconUrl} avatar href={games.item.url} />
                        <span>View On Steam</span>
                        </Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                        </Button>
                    </Segment>
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
