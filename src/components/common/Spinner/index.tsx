import React from 'react'
import { UIActivityIndicator } from 'react-native-indicators'

import { Container } from './styled'

const Spinner = () => {
  return (
    <Container>
      <UIActivityIndicator color="black" />
    </Container>
  )
}

export default Spinner
