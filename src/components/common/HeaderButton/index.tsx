import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Text } from '../styled'

const HeaderButton = ({ title, textColor = 'black', onPress }) => (
  <TouchableWithoutFeedback style={{ margin: 10 }} onPress={onPress}>
    <Text color={textColor} bold>{title}</Text>
  </TouchableWithoutFeedback>
)

export default HeaderButton