import React from 'react'
import { UIActivityIndicator } from 'react-native-indicators'

import { Container } from './styled'

const Spinner = () => {
  return (
    <Container>
      <UIActivityIndicator color="white" size={50} />
    </Container>
  )
}

export default Spinner
