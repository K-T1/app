import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { ScrollView } from '@components/common/styled'
import StepBar from '@components/KoomTone/StepBar'
import MediaLibraryView from '@components/common/MediaLibraryView'

const SourceStep = () => {
  const navigation = useNavigation()

  const imageSelect = (asset) => {
    navigation.navigate('PhotoPreviewFromSource', { asset })
  }

  return (
    <ScrollView>
      <StepBar step={1} />
      <MediaLibraryView imageSelect={imageSelect} />
    </ScrollView>
  )
}

export default SourceStep