import {
  FETCH_ALL_SUBREDDITS,
  FETCH_SUBREDDIT_FEED,
  FETCH_SUBREDDIT_NEXT_FEED,
} from '../actions/action-types';

const INITIAL_STATE = {
  subreddits: [],
  loading: false,
  error: '',
  currentFeedLoading: false,
  currentFeed: [],
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
    case FETCH_SUBREDDIT_FEED.REQUESTED:
      return {
        ...state,
        currentFeedLoading: true,
        currentFeed: [],
      };
    case FETCH_SUBREDDIT_FEED.SUCCESS:
      return {
        ...state,
        currentFeedLoading: false,
        currentFeed: action.payload,
      };

    case FETCH_SUBREDDIT_FEED.ERROR:
      return {
        ...state,
        currentFeedLoading: false,
      };
    case FETCH_SUBREDDIT_NEXT_FEED.SUCCESS:
      return {
        ...state,
        currentFeed: state.currentFeed.concat(action.payload),
      };
    default:
      return state;
  }
};
