import styled from 'styled-components'
import { fullWidth } from '@utils'

const imageWidth = fullWidth * 0.3333
const height = imageWidth

export const StyledView = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  width: ${fullWidth};
`

export const SquareImage = styled.Image`
  width: ${imageWidth};
  height: ${height};
`