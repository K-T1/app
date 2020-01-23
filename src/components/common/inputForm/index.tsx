import React from 'react'

import { Text } from '../styled'
import { textSizes } from '../../../constant/size'
import { StyledView, InputView, StyledTextInput } from './styled'

interface Props {
  name: string
  value: string
  onChangeText: (name, value) => void
}

const InputForm = ({ name, value, onChangeText }: Props) => (
  <StyledView key={name}>
    <Text size={textSizes.small2} color="white">{name}</Text>
    <InputView>
      <StyledTextInput
        secureTextEntry={name === 'password'}
        value={value}
        onChangeText={value => onChangeText(name, value)}
      />
    </InputView>
  </StyledView>
)

export default InputForm