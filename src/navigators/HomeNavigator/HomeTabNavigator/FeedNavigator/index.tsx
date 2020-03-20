import { createStackNavigator } from "react-navigation-stack";

import PhotoDetail from "@screens/PhotoDetail";
import Feed from '@screens/Feed'
import User from '@components/UserProfile'

const FeedNavigator = createStackNavigator({
  Feed,
  PhotoDetailFromFeed: {
    screen: PhotoDetail
  },
  UserFromFeed: {
    screen: User,
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

export default FeedNavigator