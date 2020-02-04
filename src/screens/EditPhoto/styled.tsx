import styled, { css } from 'styled-components'
import { Surface } from "gl-react-expo"
import { FULL_WIDTH } from '@utils'

export const StyledSurface = styled(Surface)`
  ${({ originalRatio = 1, newWidth = FULL_WIDTH, maxHeight = '100%' }) => css`
    width: ${newWidth};
    height: ${originalRatio * newWidth};
    max-height: ${maxHeight};
  `}
`