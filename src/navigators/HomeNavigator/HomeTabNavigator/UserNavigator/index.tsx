import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'

import firebase from '@configs/firebase'
import PreSignIn from '@components/UserProfile/PreSignIn'
import User from '@screens/User'
import PhotoDetail from '@screens/PhotoDetail'
import { FAVORITE_COLOR } from '@styles/colors'
import HeaderButton from '@components/common/HeaderButton'

const UserStackNavigator = createStackNavigator(
  {
    User: {
      screen: User,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('displayName'),
        headerRight: () =>
          navigation.getParam('isShowSignout') && (
            <HeaderButton
              onPress={() => firebase.auth().signOut()}
              textColor={FAVORITE_COLOR}
              title="sign out"
            />
          ),
      }),
    },
    PreSignIn,
    PhotoDetailFromUser: {
      screen: PhotoDetail,
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
)

export default UserStackNavigator
