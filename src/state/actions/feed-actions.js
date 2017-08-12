import { FETCH_FEED, FETCH_NEXT_FEED } from './action-types';

export const fetchFeed = () => ({
  type: FETCH_FEED.REQUESTED,
});

export const fetchNextFeed = lastPostName => ({
  type: FETCH_NEXT_FEED.REQUESTED,
  payload: {
    lastPostName,
  },
});
