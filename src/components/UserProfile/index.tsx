import React, { useEffect, useState, useCallback } from 'react'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'
import { RefreshControl } from 'react-native'

import userApi from '@api/user'
import {
  CircleView,
  CircleImage,
  CenterView,
  HR,
  View,
  CenterContainer,
  Text,
} from '@components/common/styled'
import Count from '@components/common/Count'
import { CountView } from '@components/UserProfile/styled'
import { FULL_WIDTH } from '@utils'
import { spaces, textSizes } from '@styles/sizes'
import { UserStore } from '@stores/UserStore'
import { User } from '@models/User'
import SquareImageButton from '@components/common/SquareImageButton'
import { toJS } from 'mobx'
import FooterFlatlist from '@components/common/Spinner/FooterFlatlist'

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
    const userData = await userApi.getUser(
      isUserProfile ? userStore.user.uid : navigation.getParam('owner').uid,
    )
    setUserState(userData)
  }

  const setUserState = userData => {
    const { photos, displayName } = userData

    setUser({
      favoriteCount: photos.reduce((accum, current) => accum + current.favorite, 0),
      usageCount: photos.reduce((accum, current) => accum + current.usageCount, 0),
      ...userData,
    })
    navigation.setParams({ displayName })
  }

  const openPhotoDetail = photo => {
    photo.owner = user
    navigation.navigate(isUserProfile ? 'PhotoDetailFromUser' : 'PhotoDetailFromFeed', { photo })
  }

  return (
    user && (
      <View refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <CenterView style={{ flex: 1 }}>
          <CircleView m={`${spaces.large4} 0 ${spaces.normal}`}>
            <CircleImage
              source={
                user.displayImage
                  ? { uri: user.displayImage }
                  : require('@assets/default-profile.png')
              }
            />
          </CircleView>
          <CountView>
            <Count name="FAVORITE" count={user.favoriteCount} />
            <Count name="TONE USAGE" count={user.usageCount} />
          </CountView>
          <HR size={FULL_WIDTH * 0.95} m={`${spaces.large2} 0 0`} />
          {user.photos.length ? (
            <FlatList
              numColumns={3}
              nestedScrollEnabled={true}
              data={toJS(user.photos)}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <SquareImageButton key={item.id} photo={item} onPress={openPhotoDetail} withSpace />
              )}
            />
          ) : (
            <CenterContainer>
              <Text size={textSizes.large3}>no post</Text>
            </CenterContainer>
          )}
        </CenterView>
      </View>
    )
  )
}

export default compose(
  inject(({ rootStore }) => ({
    userStore: rootStore.userStore,
  })),
  observer,
)(UserProfile)
