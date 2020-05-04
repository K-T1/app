import React, { useEffect } from 'react'
import { CenterContainer, ResizeImage } from '@components/common/styled'
import { useNavigation } from 'react-navigation-hooks'
import { observer, inject } from 'mobx-react'
import { compose } from 'recompose'

import { KoomToneStore } from '@stores/KoomToneStore'
import { PhotoData } from '@models/PhotoData'
import HeaderButton from '@components/common/HeaderButton'

interface Props {
  koomToneStore: KoomToneStore
}

const PhotoPreview = ({ koomToneStore }: Props) => {
  const navigation = useNavigation()
  const asset = navigation.getParam('asset')

  useEffect(() => {
    navigation.setParams({ nextStep })
  }, [])

  const nextStep = async () => {
    const { uri, width, height } = asset
    const photoData: PhotoData = { uri, width, height }
    const isFromSourceStep = navigation.state.routeName === 'PhotoPreviewFromSource'

    if (isFromSourceStep) {
      koomToneStore.setSource(photoData)
      if (navigation.getParam('isSourceSelected')) {
        await processImage()
      } else {
        navigation.navigate('ReferenceStep')
      }
    } else {
      koomToneStore.setReference(photoData)
      await processImage()
    }
  }

  const processImage = async () => {
    await koomToneStore.processImage()
    navigation.navigate('EditStep')
  }

  return (
    <CenterContainer>
      <ResizeImage
        source={{ uri: asset.uri }}
        originalRatio={asset.height / asset.width}
        resizeMode="contain"
      />
    </CenterContainer>
  )
}

PhotoPreview.navigationOptions = ({ navigation }) => ({
  headerRight: () => <HeaderButton onPress={navigation.getParam('nextStep')} title="next" />,
})

export default compose(
  inject(({ rootStore }) => ({
    koomToneStore: rootStore.koomToneStore,
  })),
  observer,
)(PhotoPreview)
