import styled, { css } from 'styled-components'
import { Surface } from "gl-react-expo"
import { FULL_WIDTH } from '@utils'
import { PRIMARY_COLOR } from '@styles/colors'
import { spaces } from '@styles/sizes'

export const StyledSurface = styled(Surface)`
  ${({ originalRatio = 1, newWidth = FULL_WIDTH, maxHeight = '100%' }) => css`
    width: ${newWidth};
    height: ${originalRatio * newWidth};
    max-height: ${maxHeight};
  `}
`

export const StyledButton = styled.TouchableOpacity`
  align-items: center;
  padding: ${spaces.large1};
  margin: 0 ${spaces.small1};
  border-bottom-width: ${props => props.active ? 2 : 0};
`

export const FilterButton = styled.TouchableOpacity`
  align-items: center;
  padding: ${spaces.large1};
  margin: 0 ${spaces.small1};
  border: ${props => props.active ? '2px solid black' : '1px solid black'};
  border-radius: 4px;
`