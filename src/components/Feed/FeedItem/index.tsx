import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from 'react-navigation-hooks'

import { ResizeImage, Text } from '@components/common/styled'

import { FeedItemView, ItemBarView } from './styled'
import { SECONDARY_COLOR, FAVORITE_COLOR } from '@styles/colors'
import { Photo } from '@models/Photo'

interface Props {
  photo: Photo
}

const FeedItem = ({ photo, favorite = Math.round(Math.random()) % 2 === 0 }: Props) => {
  const navigation = useNavigation()
  const { uri, width, height, owner } = photo
  // const [width, setWidth] = useState(1)
  // const [height, setHeight] = useState(1)

  // useEffect(() => {
  //   Image.getSize(uri, (width, height) => {
  //     setWidth(width)
  //     setHeight(height)
  //   }, (error) => { })
  // }, [uri])

  const toggleFavorite = () => {
    // TODO: Send fav photos
  }

  const openUserProfile = () => {
    console.log(owner.displayName);

    navigation.navigate('UserFromFeed', { displayName: owner.displayName })
  }

  const openPhotoPreview = () => {
    navigation.navigate('PhotoPreview', { photo })
  }

  return (
    <FeedItemView>
      <TouchableWithoutFeedback onPress={openPhotoPreview}>
        <ResizeImage source={{ uri }} originalRatio={height / width} />
      </TouchableWithoutFeedback>
      <ItemBarView>
        <TouchableWithoutFeedback onPress={openUserProfile}>
          <Text style={{ marginRight: 10 }} >{owner.displayName}</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={toggleFavorite}>
          <Text color={favorite ? FAVORITE_COLOR : SECONDARY_COLOR} bold>favorite</Text>
        </TouchableWithoutFeedback>
      </ItemBarView>
    </FeedItemView>
  )
}

export default FeedItem