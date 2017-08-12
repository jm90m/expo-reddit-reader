import { put, call, takeLatest } from 'redux-saga/effects';
import RedditAPI from 'api/reddit-api';
import { FETCH_ALL_SUBREDDITS } from '../actions/action-types';

export function* fetchAllSubreddits() {
  try {
    const subreddits = yield call(RedditAPI.getSubreddits);
    yield put({ type: FETCH_ALL_SUBREDDITS.SUCCESS, payload: subreddits.data.children });
  } catch (error) {
    yield put({ type: FETCH_ALL_SUBREDDITS.ERROR, error });
  }
}

export function* watchFetchAllSubreddits() {
  yield takeLatest(FETCH_ALL_SUBREDDITS.REQUESTED, fetchAllSubreddits);
}
