import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { MenuBar } from '../_components/MenuBar'
import { HomeContent } from '../_components/HomeContent'

class NoEntryGames extends React.Component {
    render() {
        return (
            <div>
                <h1>YOU HAVEN'T LOGIN BITCH</h1>
            </div>
        );
    }
}

class NoEntryFriends extends React.Component {
    render() {
        return (
            <div>
                <h1>YOU HAVEN'T LOGIN BITCH</h1>
            </div>
        );
    }
}

class LoginPage extends React.Component {  
    render() {
        const { msg, menu } = this.props;
        return (
            <div>
            {menu=='Home' && <HomeContent />}
            {menu=='Games' && <NoEntryGames />}
            {menu=='Friends' && <NoEntryFriends />}
            </div>
        );
    }
}




export { LoginPage as LoginPage }; 