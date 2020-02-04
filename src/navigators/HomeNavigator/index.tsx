import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'

import SignIn from '@screens/SignIn'
import HomeTabNavigator from './HomeTabNavigator'
import KoomToneNavigator from './KoomToneNavigator'

export default createStackNavigator({
  HomeTabNavigator,
  SignIn,
  KoomToneNavigator
}, {
  defaultNavigationOptions: {
    headerShown: false
  }
})
