import { call, put, takeLatest } from 'redux-saga/effects';
import RedditAPI from 'api/reddit-api';
import { FETCH_FEED, FETCH_NEXT_FEED } from '../actions/action-types';

export function* fetchFeed() {
  try {
    const feed = yield call(RedditAPI.getFeed);
    yield put({ type: FETCH_FEED.SUCCESS, payload: feed.data.children });
  } catch (error) {
    yield put({ type: FETCH_FEED.ERROR, error });
  }
}

export function* fetchNextFeed(action) {
  try {
    const { lastPostName } = action.payload;
    const nextFeed = yield call(RedditAPI.fetchNextFeed, '', lastPostName);
    yield put({ type: FETCH_NEXT_FEED.SUCCESS, payload: nextFeed.data.children });
  } catch (error) {
    yield put({ type: FETCH_NEXT_FEED.ERROR, error });
  }
}

export function* watchFetchFeed() {
  yield takeLatest(FETCH_FEED.REQUESTED, fetchFeed);
}

export function* watchFetchNextFeed() {
  yield takeLatest(FETCH_NEXT_FEED.REQUESTED, fetchNextFeed);
}
