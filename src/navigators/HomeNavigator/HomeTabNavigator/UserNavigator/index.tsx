import { createStackNavigator } from "react-navigation-stack";

import PreSignIn from '@components/UserProfile/PreSignIn'
import User from '@screens/User'
import PhotoDetail from "@screens/PhotoDetail"

const UserStackNavigator = createStackNavigator({
  User: {
    screen: User,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('displayName'),
    })
  },
  PreSignIn,
  PhotoDetailFromUser: {
    screen: PhotoDetail
  }
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
})

export default UserStackNavigator
