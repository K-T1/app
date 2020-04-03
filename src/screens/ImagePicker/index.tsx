import React from 'react'
import { ScrollView } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'

import MediaLibraryView from '@components/common/MediaLibraryView'
import { SafeAreaView } from 'react-native-safe-area-context'

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
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView>
        <MediaLibraryView imageSelect={imageSelect} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default ImagePicker
