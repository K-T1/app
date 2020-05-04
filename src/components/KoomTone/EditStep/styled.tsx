import styled, { css } from 'styled-components'
import { Surface } from 'gl-react-expo'
import { FULL_WIDTH } from '@utils'
import { spaces } from '@styles/sizes'

const NEW_HEIGHT = (4 / 3) * FULL_WIDTH

export const SurfaceView = styled.View`
  flex: 1;
  width: ${FULL_WIDTH};
  height: ${NEW_HEIGHT};
  justify-content: center;
  align-items: center;
`

export const StyledSurface = styled(Surface)`
  ${({
    originalRatio = 1,
    originalRatio2 = 1,
    newWidth = FULL_WIDTH,
    newHeight = NEW_HEIGHT,
    isFitHeight = false,
  }) => css`
    width: ${isFitHeight ? newHeight * originalRatio2 : newWidth};
    height: ${isFitHeight ? newHeight : originalRatio * newWidth};
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

export const SelectToolView = styled.View`
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
