import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { LimitView, CircleView, CircleImage, CenterView, HR } from '@components/common/styled'
import Count from '@components/common/Count'

import { photos } from '../../mocks'
import { CountView, SquareImage, PhotoView } from './styled'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FULL_WIDTH } from '@utils'
import { spaces } from '@styles/sizes'

interface Props {
  displayName?: string
  myUser: boolean
}

const initUser = {
  favoriteCount: 0,
  usageCount: 0,
  displayImage: null,
  displayName: '',
  photos: []
}

const UserProfile = ({ displayName, myUser }: Props) => {
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

  const openPhotoPreview = (photo) => {
    navigation.navigate('PhotoPreview', { photo })
  }

  return (
    <CenterView>
      <CircleView>
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
            <TouchableWithoutFeedback key={photo.id} onPress={() => openPhotoPreview(photo)}>
              <SquareImage source={{ uri: photo.uri }} />
            </TouchableWithoutFeedback>
          )
        }
      </PhotoView>
    </CenterView>
  )
}

export default UserProfile