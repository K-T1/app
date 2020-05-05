import React from 'react'
import { ScrollView, FlatList } from 'react-native-gesture-handler'

import { Text } from '@components/common/styled'

import { StyledButton } from './styled'

const ToolButtonList = ({ buttons, onPress, currentButton }) => (
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={buttons}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item: buttonData }) => (
      <StyledButton
        onPress={() => onPress(buttonData)}
        active={buttonData.name === currentButton.name}
      >
        <Text bold>{buttonData.name}</Text>
      </StyledButton>
    )}
  />
)

export default ToolButtonList
