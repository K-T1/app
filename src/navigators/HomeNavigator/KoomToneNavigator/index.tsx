import React from 'react'
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';

import Camera from '@screens/Camera'
import SelectTargetStep from '@screens/SelectTargetStep'
import SelectSourceStep from '@screens/SelectSourceStep'
import BottomTabBar from "@components/common/BottomTabBar"
import PhotoPreview from '@screens/PhotoPreview'
import EditPhoto from '@screens/EditPhoto'

const tabTitle = {
  Camera: 'CAMERA',
  SelectTargetStep: 'GALLERY',
}

const TargetStep = createBottomTabNavigator({
  Camera,
  SelectTargetStep
}, {
  initialRouteName: 'SelectTargetStep',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarButtonComponent: props =>
      <BottomTabBar routeName={tabTitle[navigation.state.routeName]} active={navigation.isFocused()}  {...props} />
  })
})

export default createStackNavigator({
  TargetStep,
  SelectSourceStep,
  PhotoPreview,
  EditPhoto
})
