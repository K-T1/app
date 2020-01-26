import { createStackNavigator } from 'react-navigation-stack'

import Register from '@screens/register'
import ProfilePicker from '@screens/profilePicker'
import ImagePicker from '@screens/profilePicker/imagePicker'

export default createStackNavigator({
  Register,
  ProfilePicker,
  ImagePicker
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
})
