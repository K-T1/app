import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import ColdStart from '../screens/coldstart'
import EditPhoto from '../screens/editphoto'

export default createStackNavigator({
  ColdStart: {
    screen: ColdStart,
    navigationOptions: {
      headerShown: false
    }
  },
  EditPhoto
})
