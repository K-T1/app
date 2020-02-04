import React from 'react'
import { useNavigationParam } from 'react-navigation-hooks'

import { ResizeImage, LimitView, CenterSAV, HR, Text } from '@components/common/styled'
import { FULL_HEIGHT } from '@utils'
import { CountView } from './styled'
import Count from '@components/common/Count'
import Button from '@components/common/Button'
import { spaces } from '@styles/sizes'

const PhotoDetail = () => {
  const photo = useNavigationParam('photo')
  const { uri, width, height, usageCount, favoriteCount } = photo

  const useTone = () => {
    // TODO: Start step 1
  }

  return (
    <CenterSAV>
      <ResizeImage source={{ uri }} originalRatio={height / width} maxHeight={FULL_HEIGHT * 0.5} />
      <HR size={300} m={`${spaces.large4} 0 ${spaces.large2}`} />
      <CountView>
        <Count name="FAVORITE" count={favoriteCount} />
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