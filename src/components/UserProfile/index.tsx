import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'

import userApi from '@api/user'
import firebase from '@configs/firebase'
import { CircleView, CircleImage, CenterView, HR, Text } from '@components/common/styled'
import Count from '@components/common/Count'
import { CountView, SquareImage, PhotoView } from '@components/UserProfile/styled'
import { FULL_WIDTH } from '@utils'
import { spaces } from '@styles/sizes'
import { FAVORITE_COLOR } from '@styles/colors'
import { UserStore } from '@stores/UserStore'
import { User } from '@models/User'
import { toJS } from 'mobx'

interface Props {
  userStore: UserStore
}

const initUser = {
  favoriteCount: 0,
  usageCount: 0,
  displayImage: null,
  displayName: '',
  favoritePhotos: []
}

const UserProfile = ({ userStore }: Props) => {
  const navigation = useNavigation()
  const [user, setUser] = useState(initUser)

  useEffect(() => {
    if (navigation.state.routeName === 'User') {
      setUserState(toJS(userStore.user))
    } else {
      setUserState(navigation.getParam('owner'))
    }
  }, [])

  const setUserState = (user) => {
    const { favoritePhotos, displayName } = user
    setUser({
      favoriteCount: favoritePhotos.reduce((accum, current) => accum + current.favoriteCount, 0),
      usageCount: favoritePhotos.reduce((accum, current) => accum + current.usageCount, 0),
      ...user
    })
    navigation.setParams({ displayName })
  }

  const openPhotoDetail = (photo) => {
    navigation.navigate('PhotoDetailFromUser', { photo })
  }

  const signOut = () => {
    firebase.auth().signOut()
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback style={{ backgroundColor: 'white', alignItems: 'flex-end', marginRight: 10 }} onPress={signOut}>
        <Text color={FAVORITE_COLOR} bold>sign out</Text>
      </TouchableWithoutFeedback>

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
            user.favoritePhotos &&
            user.favoritePhotos.map(photo =>
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

export default compose(
  inject(({ rootStore }) => ({
    userStore: rootStore.userStore
  })),
  observer
)(UserProfile)
