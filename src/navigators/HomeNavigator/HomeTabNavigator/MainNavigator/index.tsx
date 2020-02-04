import { createStackNavigator } from "react-navigation-stack";

import Main from '@screens/Main'
import PhotoDetail from "@screens/PhotoDetail";

const UserStackNavigator = createStackNavigator({
  Main,
  PhotoDetailFromMain: {
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
