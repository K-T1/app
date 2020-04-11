import React, { useCallback, useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { toJS } from 'mobx'

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
    <FlatList
      data={toJS(photoStore.pagedPhotos.data)}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <FeedItem
          key={item.id}
          photo={item}
          isLoggedIn={userStore.user != null}
        />
      )}
      onEndReached={photoStore.loadMorePhotos}
      onEndReachedThreshold={30}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
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
