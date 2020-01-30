import React, { useCallback, useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { LimitView } from '@components/common/styled'
import FeedItem from '@components/Feed/FeedItem'
import Logo from '@components/common/Logo'

import { photos } from '../../mocks'

const Feed = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(false);

    // TODO: Fetch new feeds
    setRefreshing(false)
  }, [refreshing])

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View>
        {
          photos.map(photo => <FeedItem key={photo.id} photo={photo} />)
        }
      </View>
    </ScrollView>
  )
}

Feed.navigationOptions = {
  headerTitle: () => <Logo />
}

export default Feed