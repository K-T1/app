import React from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { SafeAreaView } from 'react-native-safe-area-context'

import { View } from '@components/common/styled'
import MediaLibraryView from '@components/common/MediaLibraryView'

interface Props {
  navigation: NavigationStackProp
}

const ImagePicker = ({ navigation }: Props) => {
  const imageSelect = (asset) => {
    const setAsset = navigation.getParam('setAsset')
    const setImageUri = navigation.getParam('setImageUri')
    if (setAsset) {
      setAsset(asset)
    } else {
      setImageUri(asset.uri)
    }
    navigation.goBack()
  }

  return (
    <View contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView>
        <MediaLibraryView imageSelect={imageSelect} />
      </SafeAreaView>
    </View>
  )
}

export default ImagePicker
