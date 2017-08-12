import React, { Component } from 'react';
import { ListView } from 'react-native';
import Comment from './comment';

class CommentsList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(this.props.comments),
    };
  }

  componentWillUpdate(nextProps) {
    this.state.dataSource = this.getDataSource(nextProps.comments);
  }

  getDataSource(comments) {
    return this.state.dataSource.cloneWithRows(comments);
  }

  renderComment(comment) {
    return <Comment comment={comment} />;
  }

  render() {
    return (
      <ListView
        style={{ flex: 1 }}
        dataSource={this.state.dataSource}
        renderRow={this.renderComment}
        enableEmptySections={true}
      />
    );
  }
}

export default CommentsList;
