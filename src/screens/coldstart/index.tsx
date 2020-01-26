import React from 'react'
import { NavigationStackProp } from 'react-navigation-stack'

import { CenterSAV, Text, LimitView } from '@components/common/styled'
import SkipButton from '@components/common/skipButton'
import Button from '@components/common/button'
import { textSizes, spaces } from '@styles/sizes'

interface Props {
  navigation: NavigationStackProp
}

const ColdStart = ({ navigation }: Props) =>
  <CenterSAV>
    <LimitView>
      <Text size={textSizes.large7} margin={spaces.large2} bold>Hi,</Text>
      <Text margin={spaces.large8} bold>
        I think this is the first time we’re seeing each
        other here. Welcome!, Our Application is
        totally fully functional for free. But I
        suggested that you shoud register to enjoy
        exclusive feature and connect to the world of
        Kum Tone for free.
      </Text>
      <Button margin={`${spaces.large5} 0`} onPress={() => navigation.navigate('Register')}>
        register for free
      </Button>
      <SkipButton onPress={() => navigation.navigate('EditPhoto')} />
    </LimitView>
  </CenterSAV>

export default ColdStart
