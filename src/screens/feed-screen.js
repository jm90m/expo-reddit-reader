import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { fetchFeed, fetchNextFeed } from 'state/actions/feed-actions';
import Post from 'components/post';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import RedditDataParser from 'util/reddit-data-parser';

const LoadingContainer = styled.View`
  margin-top: 20;
  height: 100;
`;

const mapStateToProps = state => ({
  feed: state.feed.feed,
  loading: state.feed.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchFeed: () => dispatch(fetchFeed()),
  fetchNextFeed: lastPostName => dispatch(fetchNextFeed(lastPostName)),
});

class FeedScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null,
    tabBarIcon: ({ tintColor }) => <Icon name={'reddit'} size={30} color={tintColor} />,
  });

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.feed),
    };

    this.fetchMorePosts = this.fetchMorePosts.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.feed),
    });
  }

  componentDidMount() {
    this.props.fetchFeed();
  }

  fetchMorePosts() {
    const { feed } = this.props;
    const lastPost = feed[feed.length - 1];
    this.props.fetchNextFeed(lastPost.data.name);
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
    if (this.props.loading) {
      return (
        <LoadingContainer>
          <ActivityIndicator size={'large'} />
        </LoadingContainer>
      );
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
        onEndReached={this.fetchMorePosts}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
