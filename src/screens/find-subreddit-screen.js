import React, { Component } from 'react';
import { ListView, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { fetchAllSubreddits } from 'state/actions/subreddit-actions';
import { COLORS } from 'constants/styles';

const Container = styled.View`
  flex: 1;
`;

const ActivityIndicatorContainer = styled.View`
  margin-top: 20;
  height: 100;
`;

const Subreddit = styled.View`
  flex-direction: row;
  padding-top: 5;
  padding-bottom: 5;
  padding-left: 5;
  align-items: center;
`;

const SubredditText = styled.Text`
`;

const SubredditIcon = styled.Image`
  width: 30;
  height: 30;
  margin-right: 10;
`;

const EmptySubredditIcon = styled.View`
  width: 30;
  height: 30;
  margin-right: 10;
`;

const SearchInput = styled.TextInput`
  height: 50;
  width: 100%;
  padding-left: 10;
  border-width: 1;
  border-color: ${COLORS.GREY.VERY_LIGHT_GREY};
`;

const mapStateToProps = state => ({
  subreddits: state.subreddits.subreddits,
  loading: state.subreddits.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchAllSubreddits: () => dispatch(fetchAllSubreddits()),
});

class FindSubredditScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name={'search'} size={30} color={tintColor} />,
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.subreddits),
    };
    this.navigateToSubreddit = this.navigateToSubreddit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.subreddits),
    });
  }

  componentDidMount() {
    this.props.fetchAllSubreddits();
  }

  navigateToSubreddit() {}

  renderRow(rowData) {
    console.log(rowData);
    const subreddit = rowData.data;
    const { display_name_prefixed, icon_img } = subreddit;
    const subredditIcon = icon_img === ''
      ? <EmptySubredditIcon />
      : <SubredditIcon source={{ uri: icon_img }} />;
    return (
      <TouchableOpacity onPress={this.navigateToSubreddit}>
        <Subreddit>
          {subredditIcon}
          <SubredditText>{display_name_prefixed}</SubredditText>
        </Subreddit>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <SearchInput />
        {this.props.loading
          ? <ActivityIndicatorContainer>
              <ActivityIndicator size={'large'} />
            </ActivityIndicatorContainer>
          : <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              enableEmptySections={true}
            />}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindSubredditScreen);
