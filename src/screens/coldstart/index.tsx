import React from 'react'

import { CenterContainer, Button, Text } from '../../components/common/styled'
import { StyledView } from './styled'
import { textSizes, spaces } from '../../components/common/constant/size'
import { NavigationStackProp } from 'react-navigation-stack'
import SkipButton from '../../components/common/SkipButton'
import { SafeAreaProvider } from 'react-native-safe-area-context'

interface Props {
  navigation: NavigationStackProp
}

const ColdStart = ({ navigation }: Props) => {
  return (
    <CenterContainer>
      <StyledView>
        <Text size={textSizes.large7} margin={spaces.large2} bold>Hi,</Text>
        <Text margin={spaces.large8} bold>
          I think this is the first time we’re seeing each
          other here. Welcome!, Our Application is
          totally fully functional for free. But I
          suggested that you shoud register to enjoy
          exclusive feature and connect to the world of
          Kum Tone for free.
        </Text>
        <Button margin={spaces.large5}><Text color="white" bold>register for free</Text></Button>
        <SkipButton onPress={() => navigation.navigate('EditPhoto')} />
      </StyledView>
    </CenterContainer>
  )
}

export default ColdStart