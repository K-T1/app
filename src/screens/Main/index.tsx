import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { TouchableWithoutFeedback } from 'react-native'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import { CenterSAV, Text, LimitView } from '@components/common/styled'
import { PhotoView, SquareImage } from '@components/UserProfile/styled'
import Button from '@components/common/Button'
import { UserStore } from '@stores/UserStore'
import { toJS } from 'mobx'

interface Props {
  userStore: UserStore
}

const Main = ({ userStore }: Props) => {
  const navigation = useNavigation()
  const user = userStore.user

  const openPhotoDetail = (photo) => {
    navigation.navigate('PhotoDetailFromMain', { photo })
  }

  const startKoomTone = () => {
    navigation.navigate('KoomToneNavigator')
  }

  return (
    <CenterSAV>
      <Text bold>favorite</Text>
      <PhotoView style={{ margin: 50 }}>
        {
          user
            ? user.favoritePhotos.length
              ? user.favoritePhotos.map(favPhoto =>
                <TouchableWithoutFeedback key={favPhoto.id} onPress={() => openPhotoDetail(favPhoto)}>
                  <SquareImage source={{ uri: favPhoto.url }} />
                </TouchableWithoutFeedback>)
              : <CenterSAV>
                <Text>
                  {`sorry, but it’s seem like you didn’t favorite\nany tone yet. Explore our feed for new tone!`}
                </Text>
              </CenterSAV>
            : <CenterSAV>
              <Text>
                please sign in.
              </Text>
            </CenterSAV>
        }
      </PhotoView>
      <LimitView>
        <Button onPress={startKoomTone}>start by choosing image</Button>
      </LimitView>
    </CenterSAV>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    userStore: rootStore.userStore
  })),
  observer
)(Main)
