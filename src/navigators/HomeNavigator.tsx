import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import Feed from '@screens/Feed'
import PhotoPreview from '@screens/PhotoPreview'
import Main from '@screens/Main'
import SignIn from '@screens/SignIn'
import User from '@screens/User'
import UserProfile from '@components/UserProfile/'
import BottomTabBar from '@components/common/BottomTabBar'

const tabTitle = {
  FeedStackNavigator: 'FEED',
  Main: null,
  User: 'USER'
}

const FeedStackNavigator = createStackNavigator({
  Feed,
  PhotoPreview,
  UserFromFeed: {
    screen: UserProfile,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('displayName'),
    })
  }
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
})

const BottomTabNavigator = createBottomTabNavigator({
  FeedStackNavigator,
  Main,
  User
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarButtonComponent: props =>
      <BottomTabBar routeName={tabTitle[navigation.state.routeName]} active={navigation.isFocused()}  {...props} />
  })
})

export default createStackNavigator({
  BottomTabNavigator,
  SignIn,
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
})
