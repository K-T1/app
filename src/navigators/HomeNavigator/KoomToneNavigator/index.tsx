import React from 'react'
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';

import Logo from '@components/common/Logo'
import Camera from '@screens/Camera'
import BottomTabBar from "@components/common/BottomTabBar"
import SourceStep from '@components/KoomTone/SourceStep'
import ReferenceStep from '@components/KoomTone/ReferenceStep'
import EditStep from '@components/KoomTone/EditStep'
import ShareStep from '@components/KoomTone/ShareStep'
import PhotoPreview from '@components/KoomTone/PhotoPreview'
import HeaderButton from '@components/common/HeaderButton'

const tabTitle = {
  Camera: 'CAMERA',
  SourceStep: 'GALLERY',
}

const SourceStepBTNav = createBottomTabNavigator({
  Camera,
  SourceStep
}, {
  initialRouteName: 'SourceStep',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarButtonComponent: props =>
      <BottomTabBar routeName={tabTitle[navigation.state.routeName]} active={navigation.isFocused()}  {...props} />
  })
})

export default createStackNavigator({
  SourceStepBTNav: {
    screen: SourceStepBTNav,
    navigationOptions: ({ navigation }) => ({
      headerShown: navigation.state.index != 0
    })
  },
  ReferenceStep,
  EditStep,
  ShareStep,
  PhotoPreviewFromSource: { screen: PhotoPreview },
  PhotoPreviewFromReference: { screen: PhotoPreview },
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: navigation.state.index !== 0,
      headerTitle: () => <Logo />,
      headerTitleAlign: 'center',
      headerLeft: () => <HeaderButton onPress={() => navigation.goBack(null)} title="back" />
    })
  }
)
