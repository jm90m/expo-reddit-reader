import { FETCH_FEED, FETCH_NEXT_FEED } from '../actions/action-types';

const INITIAL_STATE = {
  feed: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action.type, action);
  switch (action.type) {
    case FETCH_FEED.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FEED.SUCCESS:
      return {
        feed: state.feed.concat(action.payload),
        loading: false,
      };
    case FETCH_FEED.ERROR:
      return {
        ...state,
        loading: false,
      };
    case FETCH_NEXT_FEED.SUCCESS:
      return {
        feed: state.feed.concat(action.payload),
        loading: false,
      };
    default:
      return state;
  }
};
