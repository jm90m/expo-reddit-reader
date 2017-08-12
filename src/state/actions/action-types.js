const createAsyncActionType = type => {
  return {
    REQUESTED: `${type}_REQUESTED`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`,
  };
};
export const FETCH_FEED = createAsyncActionType('fetch_feed');
export const FETCH_CURRENT_POST_COMMENTS = createAsyncActionType('fetch_current_post_comments');
export const FETCH_ALL_SUBREDDITS = createAsyncActionType('fetch_all_subreddits');
export const FETCH_NEXT_FEED = createAsyncActionType('fetch_next_feed');
export const FETCH_SUBREDDIT_FEED = createAsyncActionType('fetch_subreddit_feed');
export const FETCH_SUBREDDIT_NEXT_FEED = createAsyncActionType('fetch_subreddit_next_feed');
