import { createStackNavigator } from 'react-navigation-stack'

import ColdStart from '@screens/ColdStart'

export default createStackNavigator({
  ColdStart,
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
})
