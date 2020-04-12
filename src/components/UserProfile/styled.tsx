import styled from 'styled-components'
import { spaces } from '@styles/sizes'
import { FULL_WIDTH } from '@utils'

export const CountView = styled.View`
  flex-direction: row;
  margin: ${spaces.large3} 0 0;
`

export const PhotoView = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  width: ${FULL_WIDTH};
  margin: ${spaces.large1} 0;
`
