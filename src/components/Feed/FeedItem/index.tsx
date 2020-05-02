import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'

import { ResizeImage, Text } from '@components/common/styled'
import { SECONDARY_COLOR, FAVORITE_COLOR } from '@styles/colors'
import { Photo } from '@models/Photo'

import { FeedItemView, ItemBarView } from './styled'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { PhotoStore } from '@stores/PhotoStore'
import { View } from 'react-native'

interface Props {
  photo: Photo
  photoStore: PhotoStore
  isLoggedIn: boolean
}

const FeedItem = ({ photo, photoStore, isLoggedIn }: Props) => {
  const navigation = useNavigation()
  const { id, url: uri, width, height, owner, viewerLiked } = photo

  const toggleFavorite = () => {
    if (isLoggedIn) {
      if (viewerLiked) {
        photoStore.unfavPhoto(id)
      } else {
        photoStore.favPhoto(id)
      }
    } else {
      navigation.navigate('User')
    }
  }

  const openUserProfile = () => {
    navigation.navigate('UserFromFeed', { owner })
  }

  const openPhotoDetail = () => {
    navigation.navigate('PhotoDetailFromFeed', { photo })
  }

  return (
    <FeedItemView>
      <TouchableWithoutFeedback onPress={openPhotoDetail}>
        <ResizeImage source={{ uri }} originalRatio={height / width} />
      </TouchableWithoutFeedback>
      <ItemBarView>
        <TouchableWithoutFeedback onPress={openUserProfile}>
          <Text style={{ marginRight: 10 }}>{owner.displayName}</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={toggleFavorite}>
          <Text color={viewerLiked ? FAVORITE_COLOR : SECONDARY_COLOR} bold>
            favorite
          </Text>
        </TouchableWithoutFeedback>
      </ItemBarView>
    </FeedItemView>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    photoStore: rootStore.photoStore,
  })),
  observer,
)(FeedItem)
