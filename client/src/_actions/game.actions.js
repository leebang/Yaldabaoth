import { gameConstants } from '../_constants';
import { gameService } from '../_services';
import { history } from '../_helpers';

export const gameActions = {
    getAllGames,
    getByName,
    getAllUserByGame,
    updateGame
};

function getAllGames() {
    return dispatch => {
        dispatch(request());

        gameService.getAllGames()
            .then(
                games => dispatch(success(games)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: gameConstants.GETALL_REQUEST } }
    function success(games) { return { type: gameConstants.GETALL_SUCCESS, games } }
    function failure(error) { return { type: gameConstants.GETALL_FAILURE, error } }
}

function getByName(name) {
    return dispatch => {
        dispatch(request());

        gameService.getByName(name)
            .then(
                game => dispatch(success(game)),
                error => dispatch(failure(name, error.toString()))
            );
    };

    function request(name) { return { type: gameConstants.GETONE_REQUEST, name } }
    function success(game) { return { type: gameConstants.GETONE_SUCCESS, game } }
    function failure(name, error) { return { type: gameConstants.GETONE_FAILURE, name, error } }
}

function updateGame(user) {
    return dispatch => {
        // To request
        dispatch(request());

        gameService.update(user)
            .then(
                game => { 
                    dispatch(success(game));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: gameConstants.UPDATE_REQUEST } }
    function success(game) { return { type: gameConstants.UPDATE_SUCCESS, game } }
    function failure(error) { return { type: gameConstants.UPDATE_FAILURE, error } }
}

function getAllUserByGame(id) {
    return dispatch => {
        dispatch(request());

        gameService.getAllUserByGame(id)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request() { return { type: gameConstants.GETUSERLIST_REQUEST } }
    function success(users) { return { type: gameConstants.GETUSERLIST_SUCCESS, users } }
    function failure(id, error) { return { type: gameConstants.GETUSERLIST_FAILURE, id, error } }
}
