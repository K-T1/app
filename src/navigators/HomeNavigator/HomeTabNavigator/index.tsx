import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import BottomTabBar from '@components/common/BottomTabBar'

import FeedNavigator from './FeedNavigator'
import MainNavigator from './MainNavigator'
import UserNavigator from './UserNavigator'

const tabTitle = {
  FeedNavigator: 'FEED',
  MainNavigator: null,
  UserNavigator: 'USER'
}

const HomeTabNavigator = createBottomTabNavigator({
  FeedNavigator,
  MainNavigator,
  UserNavigator
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarButtonComponent: props =>
      <BottomTabBar routeName={tabTitle[navigation.state.routeName]} active={navigation.isFocused()}  {...props} />
  })
})

export default HomeTabNavigator