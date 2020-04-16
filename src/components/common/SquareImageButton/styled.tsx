import styled, { css } from 'styled-components'

import { FULL_WIDTH } from '@utils'

const imageFullWidth = FULL_WIDTH * 0.3333
const imageWidthWithSpace = FULL_WIDTH * 0.3

export const SquareImage = styled.Image`
  ${({ withSpace }) => css`
    margin: ${withSpace ? '5px' : 0};
    width: ${withSpace ? imageWidthWithSpace : imageFullWidth};
    height: ${withSpace ? imageWidthWithSpace : imageFullWidth};
  `}
`
