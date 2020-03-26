import React from 'react'

import { CenterContainer, Text } from '@components/common/styled'
import { textSizes } from '@styles/sizes'

interface Props {
  name: string
  count: number
}

const Count = ({ name, count }: Props) => {
  return (
    <CenterContainer>
      <Text size={textSizes.large2} bold>{Number(count).toLocaleString()}</Text>
      <Text size={textSizes.small3}>{name}</Text>
    </CenterContainer>
  )
}

export default Count