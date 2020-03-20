import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'

import { CircleView, CircleImage, CenterView, HR } from '@components/common/styled'
import Count from '@components/common/Count'
import { CountView, SquareImage, PhotoView } from '@components/UserProfile/styled'
import { FULL_WIDTH } from '@utils'
import { spaces } from '@styles/sizes'

import { photos } from '../../../mocks'

interface Props {
  displayName?: string
}

const initUser = {
  favoriteCount: 0,
  usageCount: 0,
  displayImage: null,
  displayName: '',
  photos: []
}

const OtherUserProfile = ({ displayName }: Props) => {
  const navigation = useNavigation()
  const [user, setUser] = useState(initUser)

  useEffect(() => {
    // TODO: Fetch User from displayName
    const userData = {
      favoriteCount: photos.reduce((accum, current) => accum + current.favoriteCount, 0),
      usageCount: photos.reduce((accum, current) => accum + current.usageCount, 0),
      displayName,
      displayImage: null,
      photos
    }

    setUser(userData)
  }, [displayName])

  const openPhotoDetail = (photo) => {
    navigation.navigate('PhotoDetail', { photo })
  }

  return (
    <ScrollView>
      <CenterView>
        <CircleView m={`${spaces.large4} 0`}>
          <CircleImage source={user.displayImage ? { uri: user.displayImage } : require('@assets/default-profile.png')} />
        </CircleView>
        <CountView>
          <Count name="FAVORITE" count={user.favoriteCount} />
          <Count name="TONE USAGE" count={user.usageCount} />
        </CountView>
        <HR size={FULL_WIDTH * 0.95} m={`${spaces.large2}`} />
        <PhotoView>
          {
            user.photos.map(photo =>
              <TouchableWithoutFeedback key={photo.id} onPress={() => openPhotoDetail(photo)}>
                <SquareImage source={{ uri: photo.uri }} />
              </TouchableWithoutFeedback>
            )
          }
        </PhotoView>
      </CenterView>
    </ScrollView>
  )
}

export default OtherUserProfile