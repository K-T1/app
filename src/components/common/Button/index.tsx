import React, { ReactChild } from 'react'

import { Text } from '@components/common/styled'
import { StyledButton } from './styled'

interface Props {
  children: ReactChild
  margin?: string
  onPress: () => void
  style?: object
}

const Button = ({ children, margin, onPress, style = {} }: Props) => (
  <StyledButton margin={margin} onPress={onPress} style={style}>
    <Text color="white" bold>
      {children}
    </Text>
  </StyledButton>
)

export default Button
