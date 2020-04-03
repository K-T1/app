import React, { useEffect } from 'react'
import { CenterSAV, ResizeImage } from '@components/common/styled'
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

  const nextStep = () => {
    const { uri, width, height } = asset
    const photoData: PhotoData = { uri, width, height }
    const isFromTargetStep = navigation.state.routeName === 'PhotoPreviewFromTarget'

    if (isFromTargetStep) {
      console.log('TargetSTEP');
      koomToneStore.setTarget(photoData)
      if (navigation.getParam('isSourceSelected')) {
        console.log('2nd Flow: source selected');
        processedImage(photoData)
        navigation.navigate('EditStep')
      } else {
        console.log('goto SourceStep');
        navigation.navigate('SourceStep')
      }
    } else {
      console.log('SourceSTEP');
      koomToneStore.setSource(photoData)
      processedImage(photoData)
      navigation.navigate('EditStep')
    }
  }

  const processedImage = (photoData) => {
    // TODO: WAIT PROCESSED IMAGE SOMEHOW
    koomToneStore.setProcessed(photoData)
  }

  return (
    <CenterSAV>
      <ResizeImage source={{ uri: asset.uri }} originalRatio={asset.height / asset.width} />
    </CenterSAV>
  )
}

PhotoPreview.navigationOptions = ({ navigation }) => ({
  headerRight: () => <HeaderButton onPress={navigation.getParam('nextStep')} title="next" />
})

export default compose(
  inject(({ rootStore }) => ({
    koomToneStore: rootStore.koomToneStore
  })),
  observer
)(PhotoPreview)