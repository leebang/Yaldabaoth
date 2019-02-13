import { gameConstants } from '../_constants';
import { gameService } from '../_services';
import { history } from '../_helpers';

export const gameActions = {
    getAllGame,
    getGameInfoByGameName,
    update
};

function getAllGame() {
    return dispatch => {
        dispatch(request());

        gameService.getAllGame()
            .then(
                games => dispatch(success(games)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: gameConstants.GETALLGAME_REQUEST } }
    function success(games) { return { type: gameConstants.GETALLGAME_SUCCESS, games } }
    function failure(error) { return { type: gameConstants.GETALLGAME_FAILURE, error } }
}

function getGameInfoByGameName(name) {
    return dispatch => {
        dispatch(request());

        gameService.getGameInfoByGameName(name)
            .then(
                game => dispatch(success(game)),
                error => dispatch(failure(name, error.toString()))
            );
    };

    function request(name) { return { type: gameConstants.GETGAMEINFO_REQUEST, name } }
    function success(game) { return { type: gameConstants.GETGAMEINFO_SUCCESS, game } }
    function failure(name, error) { return { type: gameConstants.GETGAMEINFO_FAILURE, name, error } }
}

function update(id) {
    return dispatch => {
        // To request
        dispatch(request());

        gameService.update(id)
            .then(
                game => { 
                    dispatch(success(game));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: gameConstants.UPDATE_REQUEST } }
    function success(game) { return { type: gameConstants.UPDATE_SUCCESS, game } }
    function failure(error) { return { type: gameConstants.UPDATE_FAILURE, id, error } }
}
