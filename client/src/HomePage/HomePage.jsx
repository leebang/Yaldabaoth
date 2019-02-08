import React from 'react';
import { connect } from 'react-redux';
import { } from 'semantic-ui-react';
import { userActions } from '../_actions';
import { FriendsContent } from '../_components/FriendsContent';
import { GamesContent } from '../_components/GamesContent';
import { HomeContent } from '../_components/HomeContent';


class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAllUser());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users, msg, menu } = this.props;
        return (
            <div>
            {menu=='Home' && <HomeContent />}
            {menu=='Games' && <GamesContent />}
            {menu=='Friends' && <FriendsContent />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
