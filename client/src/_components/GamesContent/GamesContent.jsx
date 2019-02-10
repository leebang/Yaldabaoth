import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Label, Menu, Segment, Loader } from 'semantic-ui-react';
import { gameActions, userActions } from '../../_actions';
import { SearchBar } from '../SearchBar';
import { GameCards } from '../GameCards';
import { history } from '../../_helpers';

class GamesContent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeItem: 'explore'
        }
    }

    componentDidMount() {
        this.props.dispatch(gameActions.getAllGames());
        if(this.props.authentication.loggedIn){
            this.props.dispatch(userActions.getUserAllGamesById(this.props.authentication.user._id));
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    handleSearchSelect = (select) => {
        history.push("/gameprofile/"+select);
    }

    render() {
        const { activeItem } = this.state;
        const { games, authentication, users } = this.props;
        if(users.games){
            var user_games = users.games.gamesList.map(function(e){return JSON.parse(e)});
        }
        return (
            <div>
            <Grid>
                <Grid.Column computer={5} mobile={16} largeScreen={5} widescreen={5} tablet={16}>
                    <Menu vertical size={'large'} fluid>
                        {authentication.loggedIn &&
                            <Menu.Item name='mine' active={activeItem === 'mine'} onClick={this.handleItemClick}>
                            {users.games&&
                            <Label color='teal'>{users.games.gamesList.length}</Label>
                            }
                            My Games
                            </Menu.Item>
                        }
                        <Menu.Item name='explore' active={activeItem === 'explore'} onClick={this.handleItemClick}>
                        Explore Games
                        </Menu.Item>

                        <Menu.Item>
                        {(games.items&&activeItem=='explore') &&
                        <SearchBar source={games.items.map((g)=>{return {title:g.gameName}})} onSearchSelect={this.handleSearchSelect} size={'large'} fluid/>
                        }
                        {(user_games&&activeItem=='mine') &&
                        <SearchBar source={user_games.map((g)=>{return {title:g.gameName}})} onSearchSelect={this.handleSearchSelect} size={'large'} fluid/>
                        }
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
                <Grid.Column computer={11} mobile={16} largeScreen={11} widescreen={11} tablet={16}>
                    <Segment>
                        {(users.games&&(activeItem=='mine')) ?
                        <GameCards games={user_games}/>
                        :<Loader active size={"tiny"}/>
                        }

                        {(games.items&&(activeItem=='explore')) ?
                        <GameCards games={games.items}/>
                        :<Loader active size={"tiny"}/>
                        }
                    </Segment>
                </Grid.Column>
            </Grid>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { games, users, authentication } = state;
    return {
        games,
        authentication,
        users
    };
}

const connectedGamesContent = connect(mapStateToProps)(GamesContent);
export { connectedGamesContent as GamesContent };
 