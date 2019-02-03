import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import {  } from 'semantic-ui-react';
import { HomeContent } from '../_components/HomeContent'
import { FriendsContent } from '../_components/FriendsContent'
import { GamesContent } from '../_components/GamesContent'
import { Helmet } from 'react-helmet';

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
            <Helmet>
            <style>{'body { background-color: rgb(27,28,29); }'}</style>
            </Helmet>
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