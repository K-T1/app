import React, { useEffect, useState } from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Provider } from 'mobx-react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import AppNavigator from '@navigators/index'
import { Ionicons } from '@expo/vector-icons'
import { rootStore } from '@stores/RootStore'
import Spinner from '@components/common/Spinner'

const App = () => {
  const [isReady, setIsReady] = useState(false)

  const loadFont = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      'public-sans': require('./src/assets/fonts/PublicSans.ttf'),
      'public-sans-italic': require('./src/assets/fonts/PublicSans-Italic.ttf'),
      ...Ionicons.font,
    })
    setIsReady(true)
  }

  useEffect(() => {
    loadFont()
  }, [])

  return isReady ? (
    <Provider rootStore={rootStore}>
      <SafeAreaProvider>
        <AppNavigator />
        <Spinner />
      </SafeAreaProvider>
    </Provider>
  ) : (
    <AppLoading />
  )
}

export default App
