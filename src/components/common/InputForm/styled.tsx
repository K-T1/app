import styled from 'styled-components'

import { INPUT_COLOR } from '@styles/colors'
import { spaces } from '@styles/sizes'

export const StyledView = styled.View`
  background-color: ${INPUT_COLOR};
  padding: ${spaces.normal};
  margin-bottom: ${spaces.large3};
`

export const InputView = styled.View`
  border-bottom-color: white;
  border-bottom-width: 1;
`

export const StyledTextInput = styled.TextInput`
  height: 30;
  color: white;
`