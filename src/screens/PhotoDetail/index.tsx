import React from 'react'
import { useNavigationParam, useNavigation } from 'react-navigation-hooks'

import { ResizeImage, LimitView, CenterSAV, HR } from '@components/common/styled'
import { FULL_HEIGHT } from '@utils'
import Count from '@components/common/Count'
import Button from '@components/common/Button'
import { spaces } from '@styles/sizes'

import { CountView } from './styled'

const PhotoDetail = () => {
  const navigation = useNavigation()
  const photo = useNavigationParam('photo')
  const { url, width, height, usageCount, favorite } = photo

  const useTone = () => {
    // TODO: REMOVE THIS.
    navigation.navigate('EditPhoto', { asset: photo })
  }

  return (
    <CenterSAV>
      <ResizeImage source={{ uri: url }} originalRatio={height / width} maxHeight={FULL_HEIGHT * 0.5} />
      <HR size={300} m={`${spaces.large4} 0 ${spaces.large2}`} />
      <CountView>
        <Count name="FAVORITE" count={favorite} />
        <Count name="TONE USAGE" count={usageCount} />
      </CountView>
      <LimitView>
        <Button onPress={useTone}>use this tone</Button>
      </LimitView>
    </CenterSAV>
  )
}

PhotoDetail.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('photo').owner.displayName
})

export default PhotoDetail