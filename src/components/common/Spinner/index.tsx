import React from 'react'
import { UIActivityIndicator } from 'react-native-indicators'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import { SpinnerStore } from '@stores/SpinnerStore'

import { Container } from './styled'

const Spinner = ({ spinnerStore }: { spinnerStore: SpinnerStore }) => {
  return (
    spinnerStore.display && (
      <Container>
        <UIActivityIndicator color="white" size={50} />
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
