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

export const FilterView = styled.ScrollView`
`

export const StyledButton = styled.TouchableOpacity`
  color: white;
  font-weight: bold;
  background-color: ${PRIMARY_COLOR};
  align-items: center;
  padding: ${spaces.large1};
`