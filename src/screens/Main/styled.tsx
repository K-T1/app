import styled from 'styled-components'
import { spaces } from '@styles/sizes'
import { LimitView, CenterContainer } from '@components/common/styled'
import { FULL_WIDTH } from '@utils'

export const ButtonView = styled(LimitView)`
  margin-bottom: ${spaces.large5};
`

export const FavPhotoView = styled(CenterContainer)`
  max-height: ${FULL_WIDTH};
  margin: ${spaces.large4} ${spaces.normal} ${spaces.large5};
`
