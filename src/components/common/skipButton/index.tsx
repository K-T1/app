import React from 'react'
import { View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Text } from '@components/common/styled'
import { SECONDARY_COLOR } from '@styles/colors'

interface Props {
  onPress: () => void
}

const SkipButton = ({ onPress }: Props) => (
  <View style={{ alignItems: 'center', alignContent: 'flex-start' }}>
    <TouchableWithoutFeedback onPress={onPress}>
      <Text color={SECONDARY_COLOR} bold underline>SKIP</Text>
    </TouchableWithoutFeedback>
  </View>
)

export default SkipButton