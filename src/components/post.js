import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from 'constants/styles';

const Container = styled.View`
  border-bottom-color: ${COLORS.WHITE.WHITE_SMOKE};
  border-bottom-width: 1;
  border-top-color: 1;
  border-top-width: 1;
  margin-bottom: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  padding-top: 10;
`;

const Header = styled.View`
`;

const HeaderSubReddit = styled.Text`
  color: ${COLORS.GREY.NOBEL};
  font-size: 10;
  padding-bottom: 5;
  padding-top: 5;
`;

const TitleContainer = styled.View`
  padding-bottom: 5;
`;

const Title = styled.Text`
`;

const PreviewImage = styled.Image`
  flex: 1;
  width: 100%;
  height: 300;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ScoreContainer = styled.View`
  flex-direction: row;
`;

const Score = styled.Text`
  padding-left: 5;
  padding-right: 5;
`;

const CommentsContainer = styled.View`
  flex-direction: row;
`;

const Comments = styled.Text`
  padding-left: 5;
`;

class Post extends Component {
  static propTypes = {
    subreddit: PropTypes.string,
    title: PropTypes.string,
    previewImage: PropTypes.string,
    commentsCount: PropTypes.number,
    score: PropTypes.number,
  };

  renderPreviewImage() {
    const { previewImage } = this.props;
    console.log(previewImage);
    if (previewImage) {
      return <PreviewImage source={{ uri: previewImage }} resizeMode={'stretch'} />;
    }
  }

  render() {
    const { subreddit, title, score, commentsCount } = this.props;
    return (
      <Container>
        <Header>
          <HeaderSubReddit>{`/r/${subreddit}`}</HeaderSubReddit>
        </Header>
        {this.renderPreviewImage()}
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <Footer>
          <ScoreContainer>
            <Icon name={'arrow-up'} size={14} color={COLORS.GREY.NOBEL} />
            <Score>{score}</Score>
            <Icon name={'arrow-down'} size={14} color={COLORS.GREY.NOBEL} />
          </ScoreContainer>
          <CommentsContainer>
            <Icon name={'comment-o'} size={14} color={COLORS.GREY.NOBEL} />
            <Comments>{commentsCount}</Comments>
          </CommentsContainer>
        </Footer>
      </Container>
    );
  }
}

export default Post;
