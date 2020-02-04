import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import AuthNavigator from './AuthNavigator'
import ColdStartNavigator from './ColdStartNavigator'
import HomeNavigator from './HomeNavigator'

export default createAppContainer(
  createSwitchNavigator({
    ColdStart: ColdStartNavigator,
    Auth: AuthNavigator,
    Home: HomeNavigator,
  }, {
    initialRouteName: 'Auth'
  }),
)
