import React from 'react'
import { Button, Text } from '../styled'
import { spaces } from '../../../constant/size'

const StyledButton = ({ children, margin, onPress }) => (
  <Button margin={margin} onPress={onPress}>
    <Text color="white" bold>{children}</Text>
  </Button>
)

export default StyledButton