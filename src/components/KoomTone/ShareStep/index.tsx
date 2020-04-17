import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { useNavigation } from 'react-navigation-hooks'
import { MaterialIcons } from '@expo/vector-icons'
import Toast from 'react-native-root-toast'

import {
  ResizeImage,
  ScrollView,
  LimitView,
  CenterContainer,
  Text,
} from '@components/common/styled'
import Button from '@components/common/Button'
import StepBar from '@components/KoomTone/StepBar'
import { KoomToneStore } from '@stores/KoomToneStore'
import { MediaLibraryStore } from '@stores/MediaLibraryStore'
import { UserStore } from '@stores/UserStore'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View } from 'react-native'

interface Props {
  koomToneStore: KoomToneStore
  mediaLibraryStore: MediaLibraryStore
  userStore: UserStore
}

const ShareStep = ({ koomToneStore, mediaLibraryStore, userStore }: Props) => {
  const navigation = useNavigation()
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)

  const showToast = message => {
    Toast.show(message, { position: Toast.positions.CENTER })
  }

  const saveToGallery = async () => {
    if (isDownloaded) return showToast('Photo is already downloaded.')
    try {
      setIsDownloaded(true)
      await mediaLibraryStore.saveToLibrary(koomToneStore.edited.uri)
      showToast('Download complete')
    } catch (error) {
      console.error(error)
      setIsDownloaded(false)
      showToast('Download fail please try again.')
    }
  }

  const shareToKoomTone = async () => {
    if (isUploaded) return showToast('Photo is already uploaded.')
    try {
      setIsUploaded(true)
      await koomToneStore.uploadPhoto()
      showToast('Upload complete')
    } catch (error) {
      console.error(error)
      setIsUploaded(false)
      showToast('Upload fail please try again.')
    }
  }

  const backToFeed = async () => {
    navigation.navigate('FeedNavigator')
  }

  const ButtonWithIcon = ({ onPress, name, children }) => (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
      <MaterialIcons name={name} size={48} />
      <Text bold>{children}</Text>
    </TouchableOpacity>
  )

  return (
    <ScrollView>
      <StepBar step={'shareStep'} />
      <CenterContainer>
        <ResizeImage
          source={{ uri: koomToneStore.edited.uri }}
          originalRatio={koomToneStore.edited.height / koomToneStore.edited.width}
        />
      </CenterContainer>
      <CenterContainer style={{ marginBottom: 20 }}>
        <LimitView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              margin: 20,
            }}
          >
            <ButtonWithIcon onPress={saveToGallery} name="file-download">
              download
            </ButtonWithIcon>
            {userStore.user && (
              <ButtonWithIcon onPress={shareToKoomTone} name="share">
                share to KT-1
              </ButtonWithIcon>
            )}
          </View>
          <Button onPress={backToFeed}>close</Button>
        </LimitView>
      </CenterContainer>
    </ScrollView>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    koomToneStore: rootStore.koomToneStore,
    mediaLibraryStore: rootStore.mediaLibraryStore,
    userStore: rootStore.userStore,
  })),
  observer,
)(ShareStep)
