import React, { useState, useEffect } from 'react'
import { CenterSAV, ResizeImage, LimitView, Text } from '@components/common/styled'
import { useNavigation } from 'react-navigation-hooks'

const PhotoPreview = () => {
  const [photoUri, setPhotoUri] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    const state = navigation.getParam('koomtone')

    setPhotoUri(state.step === 1 ? state.uri1 : state.uri2)
  }, [])

  return (
    <CenterSAV>
      <ResizeImage source={{ uri: photoUri }} />
    </CenterSAV>
  )
}

export default PhotoPreview