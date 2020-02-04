import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NavigationStackProp } from 'react-navigation-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Picker from 'react-native-picker-select'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';

import { StyledView, SquareImage } from '@screens/ImagePicker/styled';
import { Text, CenterView, pickerSelectStyles } from '@components/common/styled';
import { textSizes } from '@styles/sizes';
import { MediaLibraryStore } from '@stores/MediaLibraryStore';

interface Props {
  navigation: NavigationStackProp
  mediaLibraryStore: MediaLibraryStore
}

const SelectSourceStep = ({ navigation, mediaLibraryStore }: Props) => {
  useEffect(() => {
    mediaLibraryStore.getPermission()
    mediaLibraryStore.getAllAlbum()
    mediaLibraryStore.getAssets()
  }, [mediaLibraryStore.isPermissionGranted])

  const selectImage = (asset) => {
    navigation.navigate('PhotoPreview', { koomtone: { step: 1, uri1: asset.uri } })
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView>
        <CenterView>
          <Text size={textSizes.large2} bold>STEP 2</Text>
        </CenterView>
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
)(SelectSourceStep)
