import { FETCH_ALL_SUBREDDITS } from '../actions/action-types';
const INITIAL_STATE = {
  subreddits: [],
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_SUBREDDITS.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_SUBREDDITS.SUCCESS:
      return {
        subreddits: action.payload,
        loading: false,
      };
    case FETCH_ALL_SUBREDDITS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
