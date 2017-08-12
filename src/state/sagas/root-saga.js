import { spawn, all } from 'redux-saga/effects';
import { watchFetchFeed, watchFetchNextFeed } from './feed-saga';
import { watchFetchComments } from './current-post-saga';
import {
  watchFetchAllSubreddits,
  watchFetchSubredditFeed,
  watchFetchSubredditNextFeed,
} from './subreddit-saga';

function* rootSaga() {
  yield all([
    spawn(watchFetchFeed),
    spawn(watchFetchNextFeed),
    spawn(watchFetchComments),
    spawn(watchFetchAllSubreddits),
    spawn(watchFetchSubredditFeed),
    spawn(watchFetchSubredditNextFeed),
  ]);
}

export default rootSaga;
