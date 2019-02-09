import { gameConstants } from '../_constants';

export function games(state = {}, action) {
  switch (action.type) {
    case gameConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case gameConstants.GETALL_SUCCESS:
      return {
        items: action.games
      };
    case gameConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

    case gameConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case gameConstants.GETONE_SUCCESS:
      return {
        loaded: true,
        item: action.game
      };
    case gameConstants.GETONE_FAILURE:
      return { 
        error: action.error
      };

    case gameConstants.UPDATE_REQUEST:
      return {
        loading: true
      };
    case gameConstants.UPDATE_SUCCESS:
      return {
        item: action.user
      };
    case gameConstants.UPDATE_FAILURE:
      return { 
        error: action.error
      };

      case gameConstants.GETUSERLIST_REQUEST:
      return {
        loading: true
      };
    case gameConstants.GETUSERLIST_SUCCESS:
      return {
        usersList: action.users
      };
    case gameConstants.GETUSERLIST_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
    }
}