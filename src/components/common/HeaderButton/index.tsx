import React from 'react'
import { Text } from '../styled'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const HeaderButton = ({ title, onPress }) => (
  <TouchableWithoutFeedback style={{ margin: 10 }} onPress={onPress}>
    <Text bold>{title}</Text>
  </TouchableWithoutFeedback>
)

export default HeaderButton