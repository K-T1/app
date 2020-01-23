import React, { useState, useEffect } from 'react';
import { Image, View, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library'
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Picker from 'react-native-picker-select'
import { fullWidth } from '../../utils';
import { Button } from '../../components/common/styled';

const imageWidth = fullWidth * 0.3333
const height = imageWidth

const UserProfilePicker = () => {
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
    if (permissionsGranted) {
      const albumsReponse = await MediaLibrary.getAlbumsAsync()
      const albumsFiltered = albumsReponse.filter(album => album.id)
      const selectedAlbum = albumsFiltered[0]

      setAlbums(albumsFiltered)
      setNewAssetsFromSelectedAlbum(selectedAlbum)
    }
  }

  const setNewAssetsFromSelectedAlbum = async (selectedAlbum) => {
    const pagedAssets = await MediaLibrary.getAssetsAsync({ first: 60, album: selectedAlbum.id })

    setSelectedAlbum(selectedAlbum)
    setPagedAssets(pagedAssets)
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView>
        <Button onPress={getAlbumsAsync}><Text>asd</Text></Button>
        <Picker
          placeholder={{}}
          onValueChange={album => setNewAssetsFromSelectedAlbum(album)}
          items={albums.map(album => { return { label: album.title, value: album, color: 'black' } })}
          style={pickerSelectStyles}
        />
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', width: fullWidth }}>
          {pagedAssets &&
            pagedAssets.assets.map((asset, i) =>
              asset.mediaType === 'photo' &&
              <Image key={i} source={{ uri: asset.uri }} style={{ width: imageWidth, height }} />)
          }
        </View>
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


export default UserProfilePicker
