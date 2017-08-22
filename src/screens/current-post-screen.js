import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { fetchCurrentPostComments } from 'state/actions/current-post-actions';
import { connect } from 'react-redux';
import CommentsList from 'components/comments/comments-list';
import Post from 'components/post';
import RedditDataParser from 'util/reddit-data-parser';

const Container = styled.View`
  flex: 1;
`;

const mapStateToProps = state => ({
  comments: state.currentPost.comments,
  loading: state.currentPost.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchCurrentPostComments: permalink => dispatch(fetchCurrentPostComments(permalink)),
});

class CurrentPostScreen extends Component {
  componentDidMount() {
    const { permalink } = this.props.navigation.state.params.postData;
    this.props.fetchCurrentPostComments(permalink);
  }
  render() {
    const { comments, navigation, loading } = this.props;
    const { subreddit, title, num_comments, score, preview } = navigation.state.params.postData;
    const previewImage = RedditDataParser.getPreviewImage(preview);
    return (
      <Container>
        <Post
          subreddit={subreddit}
          title={title}
          commentsCount={num_comments}
          score={score}
          previewImage={previewImage}
        />
        {loading ? <ActivityIndicator size={'large'} /> : <CommentsList comments={comments} />}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPostScreen);
