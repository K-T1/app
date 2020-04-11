import React, { useEffect } from 'react'
import Picker from 'react-native-picker-select'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import { pickerSelectStyles, SquareImage, View } from '@components/common/styled'
import { MediaLibraryStore } from '@stores/MediaLibraryStore'
import { TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler'
import { toJS } from 'mobx'

interface Props {
  mediaLibraryStore: MediaLibraryStore
  imageSelect: (asset) => void
}

const MediaLibraryView = ({ mediaLibraryStore, imageSelect }: Props) => {
  useEffect(() => {
    mediaLibraryStore.getPermission()
    mediaLibraryStore.getAllAlbum()
    mediaLibraryStore.getAssets()
  }, [mediaLibraryStore.isPermissionGranted])

  return (
    <View>
      <Picker
        placeholder={{ label: 'Select a albums...', value: null }}
        onValueChange={album => mediaLibraryStore.getAssets(album)}
        items={mediaLibraryStore.albums.map(album => ({ label: album.title, value: album }))}
        style={pickerSelectStyles}
      />
      {mediaLibraryStore.pagedAssets &&
        <FlatList
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          data={toJS(mediaLibraryStore.pagedAssets.assets)}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => imageSelect(item)}>
              <SquareImage source={{ uri: item.uri }} />
            </TouchableWithoutFeedback>
          )}
          onEndReached={mediaLibraryStore.loadMoreAssets}
          onEndReachedThreshold={30}
        />
      }
    </View>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    mediaLibraryStore: rootStore.mediaLibraryStore,
  })),
  observer
)(MediaLibraryView)