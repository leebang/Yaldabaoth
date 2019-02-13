import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALLUSER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALLUSER_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALLUSER_FAILURE:
      return { 
        error: action.error
      };

    case userConstants.GETUSERINFO_REQUEST:
      return {
        loading: true
      };

    case userConstants.GETUSERINFO_SUCCESS:
      return {
        item: action.user
      };
    case userConstants.GETUSERINFO_FAILURE:
      return { 
        error: action.error
      };

    case userConstants.GETUSERGAMES_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSERGAMES_SUCCESS:
      return {
        games: action.games
      };

    case userConstants.GETUSERGAMES_FAILURE:
      return { 
        error: action.error
      };

    case userConstants.GETUSERFRIENDS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GGETUSERFRIENDS_SUCCESS:
      return {
        friends: action.friends
      };
    case userConstants.GETUSERFRIENDS_FAILURE:
      return { 
        error: action.error
      };

    case userConstants.GETUSERINVITATIONS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSERINVITATIONS_SUCCESS:
      return {
        invitations: action.invitations
      };
    case userConstants.GETUSERINVITATIONS_FAILURE:
      return { 
        error: action.error
      };

    case userConstants.GETUSERHASH_REQUEST:
      return {
        loading: true
      };

    case userConstants.GETUSERHASH_SUCCESS:
      return {
        hash: action.hash
      };
    case userConstants.GETUSERHASH_FAILURE:
      return { 
        error: action.error
      };

    case userConstants.UPDATE_REQUEST:
      return {
        loading: true
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        item: action.user
      };
    case userConstants.UPDATE_FAILURE:
      return { 
        error: action.error,
        item: action.user
      };

    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}