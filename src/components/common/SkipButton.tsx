import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Text } from './styled'
import { SECONDARY_COLOR } from './constant/color'
import { View } from 'react-native'

interface Props {
  onPress: () => void
}

const SkipButton = ({ onPress }: Props) => (
  <View style={{ alignItems: 'center', alignContent: 'flex-start' }}>
    <TouchableWithoutFeedback onPress={onPress}>
      <Text color={SECONDARY_COLOR} underline>SKIP</Text>
    </TouchableWithoutFeedback>
  </View>
)

export default SkipButton