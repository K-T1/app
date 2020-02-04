import { createStackNavigator } from "react-navigation-stack";

import User from '@screens/User'
import PhotoDetail from "@screens/PhotoDetail";

const UserStackNavigator = createStackNavigator({
  User,
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
