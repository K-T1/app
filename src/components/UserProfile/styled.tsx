import styled from 'styled-components'
import { spaces } from '@styles/sizes'
import { FULL_WIDTH } from '@utils'

const imageWidth = FULL_WIDTH * 0.3
const height = imageWidth

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

export const SquareImage = styled.Image`
  margin: 5px;
  width: ${imageWidth};
  height: ${height};
`