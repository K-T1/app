import styled from 'styled-components'
import { FULL_WIDTH, FULL_HEIGHT } from '@utils'
import { spaces } from '@styles/sizes'

export const Container = styled.View`
  width: ${FULL_WIDTH};
  height: ${FULL_HEIGHT};
  position: absolute;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 999;
`

export const TextView = styled.View`
  max-width: 300px;
  margin: ${spaces.large3} 0;
`
