import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { NavigationStackProp } from 'react-navigation-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import Picker from 'react-native-picker-select'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import { MediaLibraryStore } from '@stores/MediaLibraryStore'
import { pickerSelectStyles } from '@components/common/styled'

import { StyledView, SquareImage } from './styled'

interface Props {
  navigation: NavigationStackProp
  mediaLibraryStore: MediaLibraryStore
}

const ImagePicker = ({ navigation, mediaLibraryStore }: Props) => {
  useEffect(() => {
    mediaLibraryStore.getPermission()
    mediaLibraryStore.getAllAlbum()
    mediaLibraryStore.getAssets()
  }, [mediaLibraryStore.isPermissionGranted])

  const selectImage = (asset) => {
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
        <Picker
          onValueChange={album => mediaLibraryStore.getAssets(album)}
          items={mediaLibraryStore.albums.map(album => ({ label: album.title, value: album }))}
          style={pickerSelectStyles}
        />
        <StyledView>
          {
            mediaLibraryStore.pagedAssets
            && mediaLibraryStore.pagedAssets.assets.map(
              (asset, i) =>
                asset.mediaType === 'photo' &&
                <TouchableWithoutFeedback key={i} onPress={() => selectImage(asset)}>
                  <SquareImage source={{ uri: asset.uri }} />
                </TouchableWithoutFeedback>
            )
          }
        </StyledView>
      </SafeAreaView>
    </ScrollView>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    mediaLibraryStore: rootStore.mediaLibraryStore,
  })),
  observer
)(ImagePicker)
