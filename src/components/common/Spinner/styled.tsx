import styled from 'styled-components'
import { FULL_WIDTH, FULL_HEIGHT } from '@utils'

export const Container = styled.View`
  width: ${FULL_WIDTH};
  height: ${FULL_HEIGHT};
  position: absolute;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.65;
  z-index: 999;
`
