import { FETCH_CURRENT_POST_COMMENTS } from '../actions/action-types';

const INITIAL_STATE = {
  comments: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CURRENT_POST_COMMENTS.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CURRENT_POST_COMMENTS.SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case FETCH_CURRENT_POST_COMMENTS.ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
