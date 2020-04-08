import React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { useNavigation } from 'react-navigation-hooks'

import { CenterSAV, ResizeImage, ScrollView } from '@components/common/styled'
import Button from '@components/common/Button'
import StepBar from '@components/KoomTone/StepBar'
import { KoomToneStore } from '@stores/KoomToneStore'
import { MediaLibraryStore } from '@stores/MediaLibraryStore'
import { Image } from 'react-native'
import { SpinnerStore } from '@stores/SpinnerStore'

interface Props {
  koomToneStore: KoomToneStore
  mediaLibraryStore: MediaLibraryStore
  spinnerStore: SpinnerStore
}

const ShareStep = ({ koomToneStore, mediaLibraryStore, spinnerStore }: Props) => {
  const navigation = useNavigation()

  const saveToGallery = async () => {
    if (koomToneStore.edited) {
      await mediaLibraryStore.saveToLibrary(koomToneStore.edited.uri)
    }

    backToMain()
  }

  const shareToKoomTone = async () => {
    if (koomToneStore.edited) {
      spinnerStore.show()
      await koomToneStore.uploadPhoto()
      spinnerStore.hide()
    }

    backToMain()
  }

  const backToMain = async () => {
    navigation.navigate('FeedNavigator')
  }

  return (
    <ScrollView>
      <StepBar step={3} />
      <CenterSAV>
        <ResizeImage
          source={{ uri: koomToneStore.edited.uri }}
          originalRatio={koomToneStore.edited.height / koomToneStore.edited.width}
        />
      </CenterSAV>
      <Button onPress={saveToGallery}>save to gallery</Button>
      <Button onPress={shareToKoomTone}>share to koomtone app</Button>
      <Button onPress={backToMain}>back to main</Button>
    </ScrollView>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    koomToneStore: rootStore.koomToneStore,
    mediaLibraryStore: rootStore.mediaLibraryStore,
    spinnerStore: rootStore.spinnerStore
  })),
  observer
)(ShareStep)