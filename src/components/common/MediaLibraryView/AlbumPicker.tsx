import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { Ionicons } from '@expo/vector-icons'

import { MediaLibraryStore } from '@stores/MediaLibraryStore'

interface Props {
  mediaLibraryStore: MediaLibraryStore
  imageSelect: (asset) => void
}

const AlbumPicker = ({ mediaLibraryStore }: Props) => {
  useEffect(() => {
    mediaLibraryStore.getAssets()
    mediaLibraryStore.setPickedAlbum(null)
  }, [])

  const onPickerChange = album => {
    mediaLibraryStore.setPickedAlbum(album)
    mediaLibraryStore.getAssets(album)
  }

  return (
    <View style={{ minWidth: 100 }}>
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: 'Recent', value: null }}
        onValueChange={album => onPickerChange(album)}
        items={mediaLibraryStore.albums.map(album => ({
          label: album.title,
          value: album,
        }))}
        style={pickerSelectStyles}
        Icon={() => <Ionicons name="ios-arrow-down" color="white" size={12} />}
      />
    </View>
  )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderRadius: 50,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 25, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    borderRadius: 50,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 25, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 9,
    right: 10,
  },
})

export default compose(
  inject(({ rootStore }) => ({
    mediaLibraryStore: rootStore.mediaLibraryStore,
  })),
  observer,
)(AlbumPicker)
