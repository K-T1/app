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

  const onSave = async () => {
    if (koomToneStore.edited) {
      await mediaLibraryStore.saveToLibrary(koomToneStore.edited.uri)
    }

    navigation.navigate('MainNavigator')
  }

  const backToMain = async () => {
    navigation.navigate('MainNavigator')
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
      <Button onPress={onSave}>save local</Button>
      <Button onPress={backToMain}>back to main</Button>
    </ScrollView>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    koomToneStore: rootStore.koomToneStore,
    mediaLibraryStore: rootStore.mediaLibraryStore
  })),
  observer
)(ShareStep)