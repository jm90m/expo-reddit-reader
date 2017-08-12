import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_CURRENT_POST_COMMENTS } from '../actions/action-types';
import {
  fetchCurrentPostCommentsSuccess,
  fetchCurrentPostCommentsFail,
} from '../actions/current-post-actions';
import RedditAPI from 'api/reddit-api';
import RedditDataParser from 'util/reddit-data-parser';

export function* fetchComments(action) {
  try {
    const { permalink } = action.payload;
    const result = yield call(RedditAPI.getComments, permalink);
    const comments = result[1].data.children.map(c => c.data).filter(c => c.body);
    const formattedComments = RedditDataParser.formatComments(comments);
    yield put(fetchCurrentPostCommentsSuccess(formattedComments));
  } catch (error) {
    console.log(error);
    yield put(fetchCurrentPostCommentsFail(error));
  }
}

export function* watchFetchComments() {
  yield takeLatest(FETCH_CURRENT_POST_COMMENTS.REQUESTED, fetchComments);
}
