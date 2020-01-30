import styled from 'styled-components'
import { FULL_WIDTH } from '@utils'

const imageWidth = FULL_WIDTH * 0.3333
const height = imageWidth

export const StyledView = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  width: ${FULL_WIDTH};
`

export const SquareImage = styled.Image`
  width: ${imageWidth};
  height: ${height};
`