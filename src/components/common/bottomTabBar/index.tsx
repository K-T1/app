import React from 'react'
import { View, TouchableWithoutFeedback, Image } from 'react-native'

import { Text } from '@components/common/styled'

import { StyledCenterContainer } from './styled'
import { SECONDARY_COLOR } from '@styles/colors'

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
            : <Image source={require('@assets/logo.png')} style={{ width: 36, height: 15 }} />
        }
      </StyledCenterContainer>
    </TouchableWithoutFeedback>
  )
}

export default BottomTabBar