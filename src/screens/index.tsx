import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import firebase from '@configs/firebase'
import AppNavigator from '@navigators/index'
import Spinner from '@components/common/Spinner'
import { SpinnerStore } from '@stores/SpinnerStore'
import { UserStore } from '@stores/UserStore'

interface Props {
  spinnerStore: SpinnerStore
  userStore: UserStore
}

const Root = ({ spinnerStore, userStore }: Props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      userStore.setFirebaseUser(user)
    })
  }, [])

  return (
    <SafeAreaProvider>
      <AppNavigator />
      {spinnerStore.display && <Spinner />}
    </SafeAreaProvider>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    spinnerStore: rootStore.spinnerStore,
    userStore: rootStore.userStore
  })),
  observer
)(Root)
