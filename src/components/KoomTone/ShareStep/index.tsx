import React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { useNavigation } from 'react-navigation-hooks'

import { CenterSAV, ResizeImage, ScrollView } from '@components/common/styled'
import Button from '@components/common/Button'
import StepBar from '@components/KoomTone/StepBar'
import { KoomToneStore } from '@stores/KoomToneStore'
import { MediaLibraryStore } from '@stores/MediaLibraryStore'

interface Props {
  koomToneStore: KoomToneStore
  mediaLibraryStore: MediaLibraryStore
}

const ShareStep = ({ koomToneStore, mediaLibraryStore }: Props) => {
  const navigation = useNavigation()

  const saveToGallery = async () => {
    if (koomToneStore.edited) {
      await mediaLibraryStore.saveToLibrary(koomToneStore.edited.uri)
    }

    backToFeed()
  }

  const shareToKoomTone = async () => {
    if (koomToneStore.edited) {
      await koomToneStore.uploadPhoto()
    }

    backToFeed()
  }

  const backToFeed = async () => {
    navigation.navigate('FeedNavigator')
  }

  return (
    <ScrollView>
      <StepBar step={'shareStep'} />
      <CenterSAV>
        <ResizeImage
          source={{ uri: koomToneStore.edited.uri }}
          originalRatio={koomToneStore.edited.height / koomToneStore.edited.width}
        />
      </CenterSAV>
      <Button onPress={saveToGallery}>save to gallery</Button>
      <Button onPress={shareToKoomTone}>share to koomtone app</Button>
      <Button onPress={backToFeed}>back to feed</Button>
    </ScrollView>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    koomToneStore: rootStore.koomToneStore,
    mediaLibraryStore: rootStore.mediaLibraryStore,
  })),
  observer
)(ShareStep)