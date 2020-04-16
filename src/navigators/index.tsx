import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import AuthLoading from '@screens/index.tsx'

import AuthNavigator from './AuthNavigator'
import ColdStartNavigator from './ColdStartNavigator'
import HomeNavigator from './HomeNavigator'

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading,
    ColdStart: ColdStartNavigator,
    Auth: AuthNavigator,
    Home: HomeNavigator,
  }),
)
