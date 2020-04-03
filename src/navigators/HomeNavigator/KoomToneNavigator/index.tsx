import React from 'react'
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';

import Logo from '@components/common/Logo'
import Camera from '@screens/Camera'
import BottomTabBar from "@components/common/BottomTabBar"
import TargetStep from '@components/KoomTone/TargetStep'
import SourceStep from '@components/KoomTone/SourceStep'
import EditStep from '@components/KoomTone/EditStep'
import ShareStep from '@components/KoomTone/ShareStep'
import PhotoPreview from '@screens/PhotoPreview'
import HeaderButton from '@components/common/HeaderButton'

const tabTitle = {
  Camera: 'CAMERA',
  TargetStep: 'GALLERY',
}

const TargetStepBTNav = createBottomTabNavigator({
  Camera,
  TargetStep
}, {
  initialRouteName: 'TargetStep',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarButtonComponent: props =>
      <BottomTabBar routeName={tabTitle[navigation.state.routeName]} active={navigation.isFocused()}  {...props} />
  })
})

export default createStackNavigator({
  TargetStepBTNav,
  SourceStep,
  EditStep,
  ShareStep,
  PhotoPreviewFromTarget: { screen: PhotoPreview },
  PhotoPreviewFromSource: { screen: PhotoPreview },
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: () => <Logo />,
      headerTitleAlign: 'center',
      headerLeft: () => <HeaderButton onPress={() => navigation.goBack(null)} title="back" />
    })
  }
)
