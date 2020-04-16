import { createStackNavigator } from 'react-navigation-stack'

import Register from '@screens/Register'
import ProfilePicker from '@screens/ProfilePicker'
import ImagePicker from '@screens/ImagePicker'

export default createStackNavigator(
  {
    Register,
    ProfilePicker,
    ImagePicker,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
)
