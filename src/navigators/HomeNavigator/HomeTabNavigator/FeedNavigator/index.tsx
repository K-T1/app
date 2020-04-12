import React from 'react'
import { createStackNavigator } from "react-navigation-stack";

import PhotoDetail from "@screens/PhotoDetail";
import Feed from '@screens/Feed'
import User from '@components/UserProfile'
import HeaderButton from "@components/common/HeaderButton";

const FeedNavigator = createStackNavigator({
  Feed,
  PhotoDetailFromFeed: {
    screen: PhotoDetail
  },
  UserFromFeed: {
    screen: User,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('displayName'),
      headerLeft: () => <HeaderButton onPress={() => navigation.goBack(null)} title="back" />,
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

export default FeedNavigator