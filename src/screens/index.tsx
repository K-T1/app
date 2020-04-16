import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import axios from 'axios'
import { useNavigation } from 'react-navigation-hooks'
import { AppLoading } from 'expo'
import { AsyncStorage } from 'react-native';

import firebase from '@configs/firebase'
import { SpinnerStore } from '@stores/SpinnerStore'
import { UserStore } from '@stores/UserStore'

interface Props {
  spinnerStore: SpinnerStore
  userStore: UserStore
}

const AuthLoading = ({ spinnerStore, userStore }: Props) => {
  const navigation = useNavigation()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      spinnerStore.show()
      if (user) {
        const idToken = await user.getIdToken(true)
        axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`
        userStore.setFirebaseUser(user)
        await userStore.login(user)
        await AsyncStorage.setItem('loggedInOnce', 'true')
      } else {
        delete axios.defaults.headers.common['Authorization']
        userStore.signout()
        const isLoggedInOnce = await AsyncStorage.getItem('loggedInOnce') === null
        if (isLoggedInOnce) {
          navigation.navigate('ColdStart')
        }
      }
      navigation.navigate('FeedNavigator')
      spinnerStore.hide()
    })
  }, [])

  return <AppLoading />
}

export default compose(
  inject(({ rootStore }) => ({
    spinnerStore: rootStore.spinnerStore,
    userStore: rootStore.userStore
  })),
  observer
)(AuthLoading)
