import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { TouchableWithoutFeedback } from 'react-native'

import { CenterSAV, Text, LimitView } from '@components/common/styled'
import { PhotoView, SquareImage } from '@components/UserProfile/styled'
import Button from '@components/common/Button'

import { photos } from '../../mocks'

const Main = () => {
  const navigation = useNavigation()

  const openPhotoDetail = (photo) => {
    navigation.navigate('PhotoDetailFromMain', { photo })
  }

  const startKoomTone = () => {
    navigation.navigate('KoomToneNavigator')
  }

  return (
    <CenterSAV>
      <Text bold>favorite</Text>
      <PhotoView style={{ margin: 50 }}>
        {
          // TODO: Change photos to user favorite photos.
          photos.map(photo =>
            <TouchableWithoutFeedback key={photo.id} onPress={() => openPhotoDetail(photo)}>
              <SquareImage source={{ uri: photo.uri }} />
            </TouchableWithoutFeedback>
          )
        }
      </PhotoView>
      <LimitView>
        <Button onPress={startKoomTone}>start by choosing image</Button>
      </LimitView>
    </CenterSAV>
  )
}

export default Main
