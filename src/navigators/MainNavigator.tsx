import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import ColdStart from '../screens/coldstart'
import EditPhoto from '../screens/editPhoto'
import Register from '../screens/register'

export default createStackNavigator({
  ColdStart: {
    screen: ColdStart,
    navigationOptions: {
      headerShown: false
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false
    }
  },
  EditPhoto
})
