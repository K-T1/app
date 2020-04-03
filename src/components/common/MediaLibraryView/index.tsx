import React from 'react'
import Picker from 'react-native-picker-select'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import { TripleImageView, pickerSelectStyles, SquareImage } from '@components/common/styled'
import { MediaLibraryStore } from '@stores/MediaLibraryStore'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface Props {
  mediaLibraryStore: MediaLibraryStore
  imageSelect: (asset) => void
}

const MediaLibraryView = ({ mediaLibraryStore, imageSelect }: Props) => {
  return (
    <View>
      <Picker
        onValueChange={album => mediaLibraryStore.getAssets(album)}
        items={mediaLibraryStore.albums.map(album => ({ label: album.title, value: album }))}
        style={pickerSelectStyles}
      />
      <TripleImageView>
        {
          mediaLibraryStore.pagedAssets
          && mediaLibraryStore.pagedAssets.assets.map(
            (asset, i) =>
              asset.mediaType === 'photo' &&
              <TouchableWithoutFeedback key={i} onPress={() => imageSelect(asset)}>
                <SquareImage source={{ uri: asset.uri }} />
              </TouchableWithoutFeedback>
          )
        }
      </TripleImageView>
    </View>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    mediaLibraryStore: rootStore.mediaLibraryStore,
  })),
  observer
)(MediaLibraryView)