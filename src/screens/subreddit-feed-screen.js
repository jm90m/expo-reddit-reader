import React, { Component } from 'react';
import { ActivityIndicator, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchSubredditFeed, fetchSubredditNextFeed } from 'state/actions/subreddit-actions';
import styled from 'styled-components/native';
import RedditDataParser from 'util/reddit-data-parser';
import Post from 'components/post';

const LoadingContainer = styled.View`
  margin-top: 20;
  height: 100;
`;

const mapStateToProps = state => ({
  currentFeed: state.subreddits.currentFeed,
  currentFeedLoading: state.subreddits.currentFeedLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchSubredditFeed: subreddit => dispatch(fetchSubredditFeed(subreddit)),
  fetchSubredditNextFeed: (subreddit, lastPostName) =>
    dispatch(fetchSubredditNextFeed(subreddit, lastPostName)),
});

class SubredditFeedScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.currentFeed || []),
    };
    this.renderRow = this.renderRow.bind(this);
    this.fetchMorePostsForSubreddit = this.fetchMorePostsForSubreddit.bind(this);
  }

  componentDidMount() {
    const { subreddit } = this.props.navigation.state.params;
    this.props.fetchSubredditFeed(subreddit);
  }

  componentWillReceiveProps(nextProps) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.currentFeed),
    });
  }

  fetchMorePostsForSubreddit() {
    const { currentFeed, navigation } = this.props;
    const { subreddit } = navigation.state.params;
    const lastPost = currentFeed[currentFeed.length - 1];
    this.props.fetchSubredditNextFeed(subreddit, lastPost.data.name);
  }

  renderRow(rowData) {
    const { subreddit, title, num_comments, score, preview } = rowData.data;
    const previewImage = RedditDataParser.getPreviewImage(preview);
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Post', { postData: rowData.data })}
      >
        <Post
          subreddit={subreddit}
          title={title}
          commentsCount={num_comments}
          score={score}
          previewImage={previewImage}
        />
      </TouchableOpacity>
    );
  }

  render() {
    if (this.props.currentFeedLoading) {
      return <LoadingContainer><ActivityIndicator size={'large'} /></LoadingContainer>;
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
        onEndReached={this.fetchMorePostsForSubreddit}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubredditFeedScreen);
