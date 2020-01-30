import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import { Text } from '@components/common/styled'
import { SECONDARY_COLOR } from '@styles/colors'

import { StyledCenterContainer } from './styled'
import Logo from '../Logo'

interface Props {
  routeName: string
  active: boolean
  onPress: () => void
}

const BottomTabBar = ({ routeName, active, onPress }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <StyledCenterContainer active={active}>
        {
          routeName
            ? <Text color={`${active ? 'black' : SECONDARY_COLOR}`} bold>{routeName}</Text>
            : <Logo active={active} />
        }
      </StyledCenterContainer>
    </TouchableWithoutFeedback>
  )
}

export default BottomTabBar
