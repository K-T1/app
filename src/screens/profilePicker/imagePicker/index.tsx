import React, { useState, useEffect } from 'react';
import { Image, View, ScrollView, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library'
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Picker from 'react-native-picker-select'

import { fullWidth } from '@utils';
import { StyledView, SquareImage } from './styled';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp
}

const ImagePicker = ({ navigation }: Props) => {
  const [pagedAssets, setPagedAssets] = useState({ assets: [] })
  const [albums, setAlbums] = useState([{ title: '' }])
  const [selectedAlbum, setSelectedAlbum] = useState()
  const [permissionsGranted, setPermissionsGranted] = useState(false)

  useEffect(() => {
    getPermissionAsync()
    getAlbumsAsync()
  }, [permissionsGranted])

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    setPermissionsGranted(status === 'granted')
  }

  const getAlbumsAsync = async () => {
    if (!permissionsGranted) { return }

    const albumsReponse = await MediaLibrary.getAlbumsAsync()
    const albumsFiltered = albumsReponse.filter(album => album.id)
    const selectedAlbum = albumsFiltered[0]

    setAlbums(albumsFiltered)
    setNewAssetsFromSelectedAlbum(selectedAlbum)
  }

  const setNewAssetsFromSelectedAlbum = async (selectedAlbum = null) => {
    if (!permissionsGranted) { return }

    let pagedAssets
    if (selectedAlbum) {
      pagedAssets = await MediaLibrary.getAssetsAsync({ first: 60, album: selectedAlbum.id })
    } else {
      pagedAssets = await MediaLibrary.getAssetsAsync({ first: 60 })
    }

    setSelectedAlbum(selectedAlbum)
    setPagedAssets(pagedAssets)
  }

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
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView>
        <Picker
          placeholder={{}}
          onValueChange={album => setNewAssetsFromSelectedAlbum(album)}
          items={albums.map(album => ({ label: album.title, value: album, color: 'black' }))}
          style={pickerSelectStyles}
        />
        <StyledView width={fullWidth}>
          {pagedAssets &&
            pagedAssets.assets.map((asset, i) =>
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: 'black',
  },
  inputAndroid: {
    color: 'black',
  },
});


export default ImagePicker
