import React, { useEffect, useState, useCallback } from 'react'
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
import { RefreshControl } from 'react-native'

interface Props {
  userStore: UserStore
}

const UserProfile = ({ userStore }: Props) => {
  const navigation = useNavigation()
  const [user, setUser] = useState<User>()
  const isUserProfile = navigation.state.routeName === 'User'
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [userStore.user])

  const onRefresh = useCallback(() => {
    setRefreshing(false)
    fetchUser()
    setRefreshing(false)
  }, [refreshing])

  const fetchUser = async () => {
    if (isUserProfile) {
      setUserState(toJS(userStore.user))
    } else {
      const user = await userApi.getUser(navigation.getParam('owner').id)
      setUserState(user)
    }
  }

  const setUserState = (user) => {
    const { photos, displayName } = user

    setUser({
      favoriteCount: photos.reduce((accum, current) => accum + current.favorite, 0),
      usageCount: photos.reduce((accum, current) => accum + current.usageCount, 0),
      ...user
    })
    navigation.setParams({ displayName })
  }

  const openPhotoDetail = (photo) => {
    photo.owner = userStore.user
    navigation.navigate('PhotoDetailFromUser', { photo })
  }

  const signOut = () => {
    firebase.auth().signOut()
  }

  return (
    user && <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {
        isUserProfile &&
        <TouchableWithoutFeedback style={{ backgroundColor: 'white', alignItems: 'flex-end', marginRight: 10 }} onPress={signOut}>
          <Text color={FAVORITE_COLOR} bold>sign out</Text>
        </TouchableWithoutFeedback>
      }
      <CenterView>
        <CircleView m={`${spaces.large4} 0`}>
          <CircleImage source={user.displayImage ? { uri: user.displayImage } : require('@assets/default-profile.png')} />
        </CircleView>
        <CountView>
          <Count name="FAVORITE" count={user.favoriteCount} />
          <Count name="TONE USAGE" count={user.usageCount} />
        </CountView>
        <HR size={FULL_WIDTH * 0.95} m={`${spaces.large2} 0 0`} />
        <PhotoView>
          {
            user.photos && user.photos.map(photo =>
              <TouchableWithoutFeedback key={photo.id} onPress={() => openPhotoDetail(photo)}>
                <SquareImage source={{ uri: photo.url }} />
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
