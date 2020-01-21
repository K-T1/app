import React, { useEffect, useState } from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Provider } from 'mobx-react'
import { rootStore } from './src/stores/RootStore'
import AppNavigator from './src/navigators/AppNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  const [isReady, setIsReady] = useState(false)

  const loadFont = async () => {
    await Font.loadAsync({
      'public-sans': require('./src/assets/fonts/PublicSans.ttf'),
      'public-sans-italic': require('./src/assets/fonts/PublicSans-Italic.ttf'),
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
      </SafeAreaProvider>
    </Provider>
  ) : <AppLoading />;
}

export default App