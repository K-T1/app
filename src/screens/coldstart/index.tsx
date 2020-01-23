import React from 'react'

import { CenterContainer, Button, Text, LimitView } from '../../components/common/styled'
import { textSizes, spaces } from '../../constant/size'
import { NavigationStackProp } from 'react-navigation-stack'
import SkipButton from '../../components/common/skipButton'
import StyledButton from '../../components/common/styledButton'

interface Props {
  navigation: NavigationStackProp
}

const ColdStart = ({ navigation }: Props) =>
  <CenterContainer>
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
      <StyledButton margin={`${spaces.large5} 0`} onPress={() => navigation.navigate('Register')}>
        register for free
      </StyledButton>
      <SkipButton onPress={() => navigation.navigate('EditPhoto')} />
    </LimitView>
  </CenterContainer>

export default ColdStart