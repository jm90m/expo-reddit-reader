import { FETCH_CURRENT_POST_COMMENTS } from './action-types';

export const fetchCurrentPostCommentsSuccess = result => ({
  type: FETCH_CURRENT_POST_COMMENTS.SUCCESS,
  payload: result,
});

export const fetchCurrentPostCommentsFail = error => ({
  type: FETCH_CURRENT_POST_COMMENTS.ERROR,
  error,
});

export const fetchCurrentPostComments = permalink => ({
  type: FETCH_CURRENT_POST_COMMENTS.REQUESTED,
  payload: {
    permalink,
  },
});
