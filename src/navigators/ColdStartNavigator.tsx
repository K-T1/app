import { createStackNavigator } from 'react-navigation-stack'

import ColdStart from '@screens/coldstart'

export default createStackNavigator({
  ColdStart,
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
})
