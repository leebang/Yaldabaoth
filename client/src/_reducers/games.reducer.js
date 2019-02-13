import { gameConstants } from '../_constants';

export function game(state = {}, action) {
  switch (action.type) {
    case gameConstants.GETALLGAME_REQUEST:
      return {
        loading: true
      };
    case gameConstants.GETALLGAME_SUCCESS:
      return {
        games: action.games
      };
    case gameConstants.GETALLGAME_FAILURE:
      return { 
        error: action.error
      };

    case gameConstants.GETGAMEINFO_REQUEST:
      return {
        loading: true
      };
    case gameConstants.GETGAMEINFO_SUCCESS:
      return {
        game: action.game
      };
    case gameConstants.GETGAMEINFO_FAILURE:
      return { 
        error: action.error
      };

    case gameConstants.UPDATE_REQUEST:
      return {
        loading: true
      };
    case gameConstants.UPDATE_SUCCESS:
      return {
        game: action.game
      };
    case gameConstants.UPDATE_FAILURE:
      return { 
        error: action.error
      };

    default:
      return state
    }
}