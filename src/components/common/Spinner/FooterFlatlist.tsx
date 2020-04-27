import React from 'react'
import { UIActivityIndicator } from 'react-native-indicators'

import { CenterContainer } from '../styled'

export default () => (
  <CenterContainer style={{ paddingVertical: 10 }}>
    <UIActivityIndicator color="black" size={20} />
  </CenterContainer>
)
