import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { View, Image, Text } from 'react-native'

import Feed from '@screens/feed'
import SelectImage from '@screens/selectImage'
import UserProfile from '@screens/userProfile'

import BottomTabBar from '@components/common/bottomTabBar'

const tabTitle = {
  Feed: 'FEED',
  SelectImage: null,
  UserProfile: 'USER'
}

export default createBottomTabNavigator({
  Feed,
  SelectImage,
  UserProfile
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarButtonComponent: props =>
      <BottomTabBar routeName={tabTitle[navigation.state.routeName]} active={navigation.isFocused()}  {...props} />
  })
})
