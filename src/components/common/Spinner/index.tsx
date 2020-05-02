import React from 'react'
// import { UIActivityIndicator } from 'react-native-indicators'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import { SpinnerStore } from '@stores/SpinnerStore'

import { Container, TextView } from './styled'
import UIActivityIndicator from './Indicator'
import { Text } from '../styled'

const Spinner = ({ spinnerStore }: { spinnerStore: SpinnerStore }) => {
  return (
    spinnerStore.display && (
      <Container>
        <UIActivityIndicator color="black" size={50} count={8} />
        <TextView>
          <Text align="center" bold>
            {spinnerStore.text}
          </Text>
        </TextView>
      </Container>
    )
  )
}

export default compose(
  inject(({ rootStore }) => ({
    spinnerStore: rootStore.spinnerStore,
  })),
  observer,
)(Spinner)
