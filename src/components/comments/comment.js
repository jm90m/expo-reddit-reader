import React, { Component } from 'react';
import { View, PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import CommentsList from './comments-list';
import he from 'he';
import moment from 'moment';
import { COLORS } from 'constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  border-left-color: ${COLORS.GREY.VERY_LIGHT_GREY};
  border-left-width: ${1 / PixelRatio.get()};
  flex: 1;
  margin-bottom: 10;
  padding-left: 4;
`;

const RowContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Author = styled.Text`
  color: ${COLORS.BLUE.SUMMER_SKY};
  font-size: 10;
  font-weight: bold;
`;

const PointsAndTime = styled.Text`
  font-size: 10;
  color: ${COLORS.GREY.LIGHT_SLATE_GREY};
`;

const PostDetailsContainer = styled.View`
`;

const CommentsBody = styled.Text`
  margin-top: 5;
  margin-bottom: 5;
  font-size: 11;
  color: ${COLORS.GREY.CHARCOAL};
`;

const RepliesBtnText = styled.Text`
  font-size: 10;
  color: ${COLORS.GREY.LIGHT_SLATE_GREY};
`;

const RepliesIconContainer = styled.View`
  margin-left: 2;
  margin-top: 2;
`;

const RepliesContainer = styled.View`
  flex: 1;
  margin-left: 5;
  margin-top: 5;
`;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repliesShown: true,
    };

    this.toggleReplies = this.toggleReplies.bind(this);
  }

  toggleReplies() {
    this.setState({
      repliesShown: !this.state.repliesShown,
    });
  }

  renderRepliesSection() {
    if (this.props.comment.replies.length) {
      return (
        <View>
          <RowContainer>
            <RepliesBtnText onPress={this.toggleReplies}>
              {`replies (${this.props.comment.replies.length})`}
            </RepliesBtnText>
            <RepliesIconContainer>
              {this.state.repliesShown
                ? <Icon name={'caret-down'} size={10} color={COLORS.GREY.LIGHT_SLATE_GREY} />
                : <Icon name={'caret-right'} size={10} color={COLORS.GREY.LIGHT_SLATE_GREY} />}
            </RepliesIconContainer>
          </RowContainer>
          {this.state.repliesShown && this.renderReplies()}
        </View>
      );
    }
  }

  renderReplies() {
    return (
      <RepliesContainer>
        <CommentsList comments={this.props.comment.replies} />
      </RepliesContainer>
    );
  }

  render() {
    return (
      <Container>
        <RowContainer>
          <Author>{`${this.props.comment.author} `}</Author>
          <PointsAndTime>
            {this.props.comment.score || 0}
            {' points '}
            {moment(this.props.comment.created_utc * 1000).fromNow()}
          </PointsAndTime>
        </RowContainer>
        <PostDetailsContainer>
          <CommentsBody>
            {this.props.comment.body && he.unescape(this.props.comment.body)}
          </CommentsBody>
          {this.props.comment.replies && this.renderRepliesSection()}
        </PostDetailsContainer>
      </Container>
    );
  }
}

export default Comment;
