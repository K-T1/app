import React, { useEffect, useState } from 'react'
import Picker from 'react-native-picker-select'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { FlatList } from 'react-native-gesture-handler'
import { toJS } from 'mobx'

import { pickerSelectStyles, View } from '@components/common/styled'
import { MediaLibraryStore } from '@stores/MediaLibraryStore'

import SquareImageButton from '../SquareImageButton'
import FooterFlatlist from '../Spinner/FooterFlatlist'

interface Props {
  mediaLibraryStore: MediaLibraryStore
  imageSelect: (asset) => void
}

const MediaLibraryView = ({ mediaLibraryStore, imageSelect }: Props) => {
  const [albumPicker, setAlbumPicker] = useState(null)
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)

  useEffect(() => {
    mediaLibraryStore.getPermission()
    mediaLibraryStore.getAllAlbum()
    mediaLibraryStore.getAssets()
  }, [mediaLibraryStore.isPermissionGranted])

  const onPickerChange = album => {
    setAlbumPicker(album)
    mediaLibraryStore.getAssets(album)
  }

  const onEndReached = async () => {
    if (!onEndReachedCalledDuringMomentum) {
      await mediaLibraryStore.loadMoreAssets(albumPicker)
      setOnEndReachedCalledDuringMomentum(true)
    }
  }

  return (
    <View>
      <Picker
        placeholder={{ label: 'Select a albums...', value: null }}
        onValueChange={album => onPickerChange(album)}
        items={mediaLibraryStore.albums.map(album => ({
          label: album.title,
          value: album,
        }))}
        style={pickerSelectStyles}
      />
      {mediaLibraryStore.pagedAssets && (
        <FlatList
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          data={toJS(mediaLibraryStore.pagedAssets.assets)}
          renderItem={({ item }) => (
            <SquareImageButton key={item.id} photo={item} onPress={imageSelect} />
          )}
          onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={FooterFlatlist}
        />
      )}
    </View>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    mediaLibraryStore: rootStore.mediaLibraryStore,
  })),
  observer,
)(MediaLibraryView)
