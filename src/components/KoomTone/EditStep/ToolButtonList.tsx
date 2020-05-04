import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

import { Text } from '@components/common/styled'

import { StyledButton } from './styled'

const ToolButtonList = ({ buttons, onPress, currentButton }) => (
  <ScrollView bounces={false} horizontal showsHorizontalScrollIndicator={false}>
    {buttons.map(buttonData => (
      <StyledButton
        key={buttonData.name}
        onPress={() => onPress(buttonData)}
        active={buttonData.name === currentButton.name}
      >
        <Text bold>{buttonData.name}</Text>
      </StyledButton>
    ))}
  </ScrollView>
)

export default ToolButtonList
