import styled, { css } from 'styled-components'
import { Surface } from 'gl-react-expo'
import { FULL_WIDTH } from '@utils'
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
  border-bottom-width: ${props => (props.active ? 2 : 0)};
`

export const ToolView = styled.View`
  margin: 0 20px 40px;
`

export const EditorStepView = styled.View`
  margin: ${spaces.large2} 0;
  flex-direction: row;
  justify-content: space-evenly;
`

export const Dot = styled.View`
  position: absolute;
  border-radius: 1;
  background-color: black;
  height: 2;
  width: 2;
`
