import React from 'react'
import { useNavigationParam, useNavigation } from 'react-navigation-hooks'
import { compose } from 'recompose'
import { observer, inject } from 'mobx-react'

import { ResizeImage, LimitView, CenterSAV, HR } from '@components/common/styled'
import { FULL_HEIGHT } from '@utils'
import Count from '@components/common/Count'
import Button from '@components/common/Button'
import { spaces } from '@styles/sizes'
import { KoomToneStore } from '@stores/KoomToneStore'

import { CountView } from './styled'

interface Props {
  koomToneStore: KoomToneStore
}

const PhotoDetail = ({ koomToneStore }: Props) => {
  const navigation = useNavigation()
  const photo = useNavigationParam('photo')
  const { url, width, height, usageCount, favorite } = photo

  const useTone = () => {
    // TODO: REMOVE THIS.
    photo.uri = url
    koomToneStore.clearStore()
    koomToneStore.setTargetWithSource(url)
    navigation.navigate('TargetStep', { isSourceSelected: true })
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

export default compose(
  inject(({ rootStore }) => ({
    koomToneStore: rootStore.koomToneStore
  })),
  observer
)(PhotoDetail)