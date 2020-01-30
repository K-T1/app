import React, { ReactChild } from 'react'

import { StyledButton, Text } from '@components/common/styled'

interface Props {
  children: ReactChild
  margin?: string
  onPress: () => void
}

const Button = ({ children, margin, onPress }: Props) => (
  <StyledButton margin={margin} onPress={onPress}>
    <Text color="white" bold>{children}</Text>
  </StyledButton>
)

export default Button