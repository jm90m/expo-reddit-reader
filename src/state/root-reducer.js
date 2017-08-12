import { combineReducers } from 'redux';
import feed from './reducers/feed-reducer';
import currentPost from './reducers/current-post-reducer';
import subreddits from './reducers/subreddit-reducer';
export default combineReducers({
  feed,
  currentPost,
  subreddits,
});
