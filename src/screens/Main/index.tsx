import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { FlatList } from 'react-native-gesture-handler'
import { toJS } from 'mobx'

import { CenterSAV, Text, LimitView } from '@components/common/styled'
import Button from '@components/common/Button'
import { UserStore } from '@stores/UserStore'
import { KoomToneStore } from '@stores/KoomToneStore'
import { FULL_WIDTH } from '@utils'
import SquareImageButton from '@components/common/SquareImageButton'
import { spaces, textSizes } from '@styles/sizes'

interface Props {
  userStore: UserStore
  koomToneStore: KoomToneStore
}

const Main = ({ userStore, koomToneStore }: Props) => {
  const navigation = useNavigation()
  const user = userStore.user

  const openPhotoDetail = (photo) => {
    navigation.navigate('PhotoDetailFromMain', { photo })
  }

  const startKoomTone = () => {
    koomToneStore.clearStore()
    navigation.navigate('KoomToneNavigator')
  }

  const CenterText = ({ text }) => (
    <CenterSAV>
      <Text>
        {text}
      </Text>
    </CenterSAV>
  )

  return (
    <CenterSAV>
      <View style={{ maxHeight: FULL_WIDTH, marginBottom: 16 }}>
        {
          user
            ? user.favoritePhotos.length
              ? <FlatList
                numColumns={3}
                data={toJS(user.favoritePhotos)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                  <SquareImageButton key={item.id} photo={item} onPress={openPhotoDetail} withSpace />}
              />
              : <CenterText text={`sorry, but it’s seem like you didn’t favorite\nany tone yet. Explore our feed for new tone!`} />
            : <CenterText text={'please sign in.'} />
        }
      </View>
      <LimitView>
        <Button onPress={startKoomTone}>start by choosing image</Button>
      </LimitView>
    </CenterSAV>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    userStore: rootStore.userStore,
    koomToneStore: rootStore.koomToneStore
  })),
  observer
)(Main)
