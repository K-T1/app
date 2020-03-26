import React, { useCallback, useState, useEffect } from 'react'
import { RefreshControl, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { observer, inject } from 'mobx-react'
import { compose } from 'recompose'

import FeedItem from '@components/Feed/FeedItem'
import Logo from '@components/common/Logo'
import { PhotoStore } from '@stores/PhotoStore'
import { UserStore } from '@stores/UserStore'

interface Props {
  photoStore: PhotoStore
  userStore: UserStore
}

const Feed = ({ photoStore, userStore }: Props) => {
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    photoStore.fetchPagedPhotos()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(false)
    photoStore.fetchPagedPhotos()
    setRefreshing(false)
  }, [refreshing])

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View>
        {
          photoStore.pagedPhotos &&
          photoStore.pagedPhotos.data.map(photo =>
            <FeedItem
              key={photo.id}
              photo={photo}
              isLoggedIn={userStore.user != null}
            />)
        }
      </View>
    </ScrollView>
  )
}

Feed.navigationOptions = {
  headerTitle: () => <Logo />
}

export default compose(
  inject(({ rootStore }) => ({
    photoStore: rootStore.photoStore,
    userStore: rootStore.userStore
  })),
  observer
)(Feed)
