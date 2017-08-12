import { spawn, all } from 'redux-saga/effects';
import { watchFetchFeed, watchFetchNextFeed } from './feed-saga';
import { watchFetchComments } from './current-post-saga';
import { watchFetchAllSubreddits } from './subreddit-saga';

function* rootSaga() {
  yield all([
    spawn(watchFetchFeed),
    spawn(watchFetchNextFeed),
    spawn(watchFetchComments),
    spawn(watchFetchAllSubreddits),
  ]);
}

export default rootSaga;
