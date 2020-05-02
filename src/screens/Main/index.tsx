import React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { FlatList } from 'react-native-gesture-handler'
import { toJS } from 'mobx'

import {
  Text,
  CenterSAV,
  CenterContainer,
  View,
  SafeAreaView,
  CenterView,
} from '@components/common/styled'
import Button from '@components/common/Button'
import { UserStore } from '@stores/UserStore'
import { KoomToneStore } from '@stores/KoomToneStore'
import SquareImageButton from '@components/common/SquareImageButton'
import { ButtonView, FavPhotoView } from './styled'

interface Props {
  userStore: UserStore
  koomToneStore: KoomToneStore
}

const Main = ({ userStore, koomToneStore }: Props) => {
  const navigation = useNavigation()
  const user = userStore.user

  const openPhotoDetail = photo => {
    navigation.navigate('PhotoDetailFromMain', { photo })
  }

  const startKoomTone = () => {
    koomToneStore.clearStore()
    navigation.navigate('KoomToneNavigator')
  }

  return (
    <SafeAreaView>
      <View style={{ justifyContent: 'flex-end' }}>
        <CenterView>
          <Text bold>favorite</Text>
        </CenterView>
        <FavPhotoView>
          {user ? (
            user.favoritePhotos.length ? (
              <View style={{ alignSelf: 'flex-start' }}>
                <FlatList
                  numColumns={3}
                  data={toJS(user.favoritePhotos)}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <SquareImageButton
                      key={item.id}
                      photo={item}
                      onPress={openPhotoDetail}
                      withSpace
                    />
                  )}
                />
              </View>
            ) : (
              <Text>
                {`sorry, but it’s seem like you didn’t favorite\nany tone yet. Explore our feed for new tone!`}
              </Text>
            )
          ) : (
            <Text>sign in to see your favorite's photo.</Text>
          )}
        </FavPhotoView>
      </View>
      <CenterView>
        <ButtonView>
          <Button onPress={startKoomTone}>start by choosing image</Button>
        </ButtonView>
      </CenterView>
    </SafeAreaView>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    userStore: rootStore.userStore,
    koomToneStore: rootStore.koomToneStore,
  })),
  observer,
)(Main)
