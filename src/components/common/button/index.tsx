import React from 'react'

import { Button as StyledButton, Text } from '@components/common/styled'

const Button = ({ children, margin, onPress }) => (
  <StyledButton margin={margin} onPress={onPress}>
    <Text color="white" bold>{children}</Text>
  </StyledButton>
)

export default Button