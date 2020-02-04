import { createStackNavigator } from 'react-navigation-stack'

import Register from '@screens/Register'
import ProfilePicker from '@screens/ProfilePicker'
import ImagePicker from '@screens/ImagePicker'
import SignIn from '@screens/SignIn'

export default createStackNavigator({
  SignIn,
  Register,
  ProfilePicker,
  ImagePicker
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
})
