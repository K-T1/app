import { createStackNavigator } from "react-navigation-stack";

import PhotoDetail from "@screens/PhotoDetail";
import Feed from '@screens/Feed'
import OtherUserProfile from '@components/UserProfile/OtherUserProfile'

const FeedNavigator = createStackNavigator({
  Feed,
  PhotoDetailFromFeed: {
    screen: PhotoDetail
  },
  UserFromFeed: {
    screen: OtherUserProfile,
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