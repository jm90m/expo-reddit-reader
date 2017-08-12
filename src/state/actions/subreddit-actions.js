import {
  FETCH_ALL_SUBREDDITS,
  FETCH_SUBREDDIT_FEED,
  FETCH_SUBREDDIT_NEXT_FEED,
} from './action-types';

export const fetchAllSubreddits = () => ({
  type: FETCH_ALL_SUBREDDITS.REQUESTED,
});

export const fetchSubredditFeed = subreddit => ({
  type: FETCH_SUBREDDIT_FEED.REQUESTED,
  payload: {
    subreddit,
  },
});

export const fetchSubredditNextFeed = (subreddit, lastPostName) => ({
  type: FETCH_SUBREDDIT_NEXT_FEED,
  payload: {
    subreddit,
    lastPostName,
  },
});
