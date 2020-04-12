import React, { useEffect, useState } from 'react'
import Picker from 'react-native-picker-select'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler'
import { toJS } from 'mobx'

import { pickerSelectStyles, View, Text } from '@components/common/styled'
import { MediaLibraryStore } from '@stores/MediaLibraryStore'
import SquareImageButton from '../SquareImageButton'

interface Props {
  mediaLibraryStore: MediaLibraryStore
  imageSelect: (asset) => void
}

const MediaLibraryView = ({ mediaLibraryStore, imageSelect }: Props) => {
  const [albumPicker, setAlbumPicker] = useState(null)

  useEffect(() => {
    mediaLibraryStore.getPermission()
    mediaLibraryStore.getAllAlbum()
    mediaLibraryStore.getAssets()
  }, [mediaLibraryStore.isPermissionGranted])

  const onPickerChange = (album) => {
    setAlbumPicker(album)
    mediaLibraryStore.getAssets(album)
  }

  return (
    <View>
      <Picker
        placeholder={{ label: 'Select a albums...', value: null }}
        onValueChange={album => onPickerChange(album)}
        items={mediaLibraryStore.albums.map(album => ({ label: album.title, value: album }))}
        style={pickerSelectStyles}
      />
      {mediaLibraryStore.pagedAssets &&
        <FlatList
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          data={toJS(mediaLibraryStore.pagedAssets.assets)}
          renderItem={({ item }) =>
            <SquareImageButton key={item.id} photo={item} onPress={imageSelect} />}
          onEndReached={() => mediaLibraryStore.loadMoreAssets(albumPicker)}
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