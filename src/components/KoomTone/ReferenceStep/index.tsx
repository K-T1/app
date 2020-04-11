import React from 'react'
import { useNavigation } from 'react-navigation-hooks'

import { View } from '@components/common/styled'
import StepBar from '@components/KoomTone/StepBar'
import MediaLibraryView from '@components/common/MediaLibraryView'

const ReferenceStep = () => {
  const navigation = useNavigation()

  const imageSelect = (asset) => {
    navigation.navigate('PhotoPreviewFromReference', { asset })
  }

  return (
    <View>
      <StepBar step={'referenceStep'} />
      <MediaLibraryView imageSelect={imageSelect} />
    </View>
  )
}

export default ReferenceStep