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
import AlbumPicker from './AlbumPicker'

interface Props {
  mediaLibraryStore: MediaLibraryStore
  imageSelect: (asset) => void
}

const MediaLibraryView = ({ mediaLibraryStore, imageSelect }: Props) => {
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    mediaLibraryStore.getPermission()
    mediaLibraryStore.getAllAlbum()
    mediaLibraryStore.getAssets()
  }, [mediaLibraryStore.isPermissionGranted])

  const onEndReached = async () => {
    if (!onEndReachedCalledDuringMomentum) {
      await mediaLibraryStore.loadMoreAssets(mediaLibraryStore.pickedAlbum)
      setIsLoading(mediaLibraryStore.pagedAssets.hasNextPage)
      setOnEndReachedCalledDuringMomentum(true)
    }
  }

  return (
    <View>
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
          ListFooterComponent={isLoading && FooterFlatlist}
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
