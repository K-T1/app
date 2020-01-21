import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainNavigator'

export default createAppContainer(
  createSwitchNavigator({
    Main: MainTabNavigator,
  }),
)
