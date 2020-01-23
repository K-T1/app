import { createStackNavigator } from 'react-navigation-stack'

import ColdStart from '../screens/coldstart'
import EditPhoto from '../screens/editPhoto'
import Register from '../screens/register'
import Home from '../screens/home'
import UserProfilePicker from '../screens/register/UserProfilePicker'

export default createStackNavigator({
  // ColdStart,
  Register,
  // EditPhoto,
  UserProfilePicker,
  // Home
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
})
