import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from 'state/configure-store';
import FeedScreen from 'screens/feed-screen';
import CurrentPostScreen from 'screens/current-post-screen.js';
import FindSubredditScreen from 'screens/find-subreddit-screen';
import SubredditFeedScreen from 'screens/subreddit-feed-screen';
import { StackNavigator, TabNavigator } from 'react-navigation';
import styled from 'styled-components/native';

const AppContainer = styled.View`
  flex: 1;
`;

const store = configureStore();

const tabNavigatorConfig = {
  tabBarOptions: {
    showLabel: false,
  },
};

const feedStackNavigatorOptions = {
  headerMode: 'float',
};

const AppNavigation = TabNavigator(
  {
    Feed: {
      screen: StackNavigator(
        {
          Feed: {
            screen: FeedScreen,
          },
          Post: {
            screen: CurrentPostScreen,
          },
        },
        feedStackNavigatorOptions,
      ),
      navigationOptions: {
        tabBar: (state, acc) => {
          return {
            label: '',
            visible: (acc && acc.visible !== 'undefined') ? acc.visible : true,
          }
        },
      }
    },
    FindSubredditScreen: {
      screen: StackNavigator({
        FindSubredditScreen: {
          screen: FindSubredditScreen,
        },
        SubredditFeedScreen: {
          screen: SubredditFeedScreen,
        },
        Post: {
          screen: CurrentPostScreen,
        },
      }),
    },
  },
  tabNavigatorConfig,
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer>
          <StatusBar hidden={true} />
          <AppNavigation />
        </AppContainer>
      </Provider>
    );
  }
}
