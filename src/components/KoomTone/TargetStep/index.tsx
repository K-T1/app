import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { ScrollView } from '@components/common/styled'
import StepBar from '@components/KoomTone/StepBar'
import MediaLibraryView from '@components/common/MediaLibraryView'

const TargetStep = () => {
  const navigation = useNavigation()

  const imageSelect = (asset) => {
    const isSourceSelected = navigation.getParam('isSourceSelected')
    navigation.navigate('PhotoPreviewFromTarget', { asset, isSourceSelected })
  }

  return (
    <ScrollView>
      <StepBar step={0} />
      <MediaLibraryView imageSelect={imageSelect} />
    </ScrollView>
  )
}

export default TargetStep