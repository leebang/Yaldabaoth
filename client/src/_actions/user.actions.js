import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAllUser,
    getUserInfoByUsername,
    getUserGamesByUsername,
    getUserFriendsByUsername,
    getUserInvitationsByUsername,
    getUserHashById,
    update,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAllUser() {
    return dispatch => {
        dispatch(request());

        userService.getAllUser()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALLUSER_REQUEST } }
    function success(users) { return { type: userConstants.GETALLUSER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALLUSER_FAILURE, error } }
}

function getUserInfoByUsername(username) {
    return dispatch => {
        dispatch(request());

        userService.getUserInfoByUsername(username)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(username, error.toString()))
            );
    };

    function request(username) { return { type: userConstants.GETUSERINFO_REQUEST, username } }
    function success(user) { return { type: userConstants.GETUSERINFO_SUCCESS, user } }
    function failure(username, error) { return { type: userConstants.GETUSERINFO_FAILURE, username, error } }
}

function getUserGamesByUsername(username) {
    return dispatch => {
        dispatch(request());

        userService.getUserGamesByUsername(username)
            .then(
                games => dispatch(success(games)),
                error => dispatch(failure(username, error.toString()))
            );
    };

    function request(username) { return { type: userConstants.GETUSERGAMES_REQUEST, username } }
    function success(games) { return { type: userConstants.GETUSERGAMES_SUCCESS, games } }
    function failure(username, error) { return { type: userConstants.GETUSERGAMES_FAILURE, username, error } }
}

function getUserFriendsByUsername(username) {
    return dispatch => {
        dispatch(request());

        userService.getUserFriendsByUsername(username)
            .then(
                friends => dispatch(success(friends)),
                error => dispatch(failure(username, error.toString()))
            );
    };

    function request(username) { return { type: userConstants.GETUSERFRIENDS_REQUEST, username } }
    function success(friends) { return { type: userConstants.GETUSERFRIENDS_SUCCESS, friends } }
    function failure(username, error) { return { type: userConstants.GETUSERFRIENDS_FAILURE, username, error } }
}

function getUserInvitationsByUsername(username) {
    return dispatch => {
        dispatch(request());

        userService.getUserInvitationsByUsername(username)
            .then(
                invitations => dispatch(success(invitations)),
                error => dispatch(failure(username, error.toString()))
            );
    };

    function request(username) { return { type: userConstants.GETUSERINVITATIONS_REQUEST, username } }
    function success(invitations) { return { type: userConstants.GETUSERINVITATIONS_SUCCESS, invitations } }
    function failure(username, error) { return { type: userConstants.GETUSERINVITATIONS_FAILURE, username, error } }
}

function getUserHashById(id) {
    return dispatch => {
        dispatch(request(id));

        userService.getUserHashById(id)
            .then(
                hash => dispatch(success(hash)),
                error => dispatch(failure(username, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.GETUSERHASH_REQUEST, id } }
    function success(hash) { return { type: userConstants.GETUSERHASH_SUCCESS, hash } }
    function failure(id, error) { return { type: userConstants.GETUSERHASH_FAILURE, id, error } }
}

function update(user) {
    return dispatch => {
        // To request
        dispatch(request());

        userService.update(user)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/profile');
                },
                error => {
                    dispatch(failure(error.toString(), user));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.UPDATE_REQUEST } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error, user) { return { type: userConstants.UPDATE_FAILURE, error, user } }
}



// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                id => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}