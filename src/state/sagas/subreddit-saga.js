import { put, call, takeLatest } from 'redux-saga/effects';
import RedditAPI from 'api/reddit-api';
import {
  FETCH_ALL_SUBREDDITS,
  FETCH_SUBREDDIT_FEED,
  FETCH_SUBREDDIT_NEXT_FEED,
} from '../actions/action-types';

export function* fetchAllSubreddits() {
  try {
    const subreddits = yield call(RedditAPI.getSubreddits);
    yield put({ type: FETCH_ALL_SUBREDDITS.SUCCESS, payload: subreddits.data.children });
  } catch (error) {
    yield put({ type: FETCH_ALL_SUBREDDITS.ERROR, error });
  }
}

export function* fetchSubredditFeed(action) {
  try {
    const { subreddit } = action.payload;
    const subredditFeed = yield call(RedditAPI.getFeed, subreddit);
    yield put({ type: FETCH_SUBREDDIT_FEED.SUCCESS, payload: subredditFeed.data.children });
  } catch (error) {
    yield put({ type: FETCH_SUBREDDIT_FEED.ERROR, error });
  }
}

export function* fetchSubredditNextFeed(action) {
  try {
    const { lastPostName, subreddit } = action.payload;
    const nextFeed = yield call(RedditAPI.fetchNextFeed, subreddit, lastPostName);
    yield put({ type: FETCH_SUBREDDIT_NEXT_FEED.SUCCESS, payload: nextFeed.data.children });
  } catch (error) {
    yield put({ type: FETCH_SUBREDDIT_NEXT_FEED.ERROR, error });
  }
}

export function* watchFetchAllSubreddits() {
  yield takeLatest(FETCH_ALL_SUBREDDITS.REQUESTED, fetchAllSubreddits);
}

export function* watchFetchSubredditFeed() {
  yield takeLatest(FETCH_SUBREDDIT_FEED.REQUESTED, fetchSubredditFeed);
}

export function* watchFetchSubredditNextFeed() {
  yield takeLatest(FETCH_SUBREDDIT_NEXT_FEED.REQUESTED, fetchSubredditNextFeed);
}
