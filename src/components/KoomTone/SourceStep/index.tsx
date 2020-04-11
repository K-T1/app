import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { ScrollView } from '@components/common/styled'
import StepBar from '@components/KoomTone/StepBar'
import MediaLibraryView from '@components/common/MediaLibraryView'

const SourceStep = () => {
  const navigation = useNavigation()
  const isSourceSelected = navigation.getParam('isSourceSelected')

  const imageSelect = (asset) => {
    navigation.navigate('PhotoPreviewFromTarget', { asset, isSourceSelected })
  }

  return (
    <ScrollView>
      <StepBar step={isSourceSelected ? 'sourceWithReferenceStep' : 'sourceStep'} />
      <MediaLibraryView imageSelect={imageSelect} />
    </ScrollView>
  )
}

export default SourceStep