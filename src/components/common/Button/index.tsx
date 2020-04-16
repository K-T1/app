import React, { ReactChild } from 'react'

import { Text } from '@components/common/styled'
import { StyledButton } from './styled'

interface Props {
  children: ReactChild
  margin?: string
  onPress: () => void
}

const Button = ({ children, margin, onPress }: Props) => (
  <StyledButton margin={margin} onPress={onPress} style={{ width: '100%' }}>
    <Text color="white" bold>
      {children}
    </Text>
  </StyledButton>
)

export default Button
