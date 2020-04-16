import styled from 'styled-components'
import { CenterContainer } from '../styled'

export const StyledCenterContainer = styled(CenterContainer)`
  border-bottom-width: ${props => (props.active ? 2 : 0)};
`
