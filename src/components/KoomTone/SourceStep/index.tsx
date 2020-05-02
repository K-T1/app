import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { View } from '@components/common/styled'
import StepBar from '@components/KoomTone/StepBar'
import MediaLibraryView from '@components/common/MediaLibraryView'
import AlbumPicker from '@components/common/MediaLibraryView/AlbumPicker'

const SourceStep = () => {
  const navigation = useNavigation()
  const isSourceSelected = navigation.getParam('isSourceSelected')

  const imageSelect = asset => {
    navigation.navigate('PhotoPreviewFromSource', { asset, isSourceSelected })
  }

  return (
    <View>
      <StepBar step={isSourceSelected ? 'sourceWithReferenceStep' : 'sourceStep'} />
      <MediaLibraryView imageSelect={imageSelect} />
    </View>
  )
}

export default SourceStep
