import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Text } from '../styled'

const HeaderButton = ({ style = {}, title, textColor = 'black', onPress }) => (
  <TouchableWithoutFeedback style={{ padding: 10, ...style }} onPress={onPress}>
    <Text color={textColor} bold>{title}</Text>
  </TouchableWithoutFeedback>
)

export default HeaderButton