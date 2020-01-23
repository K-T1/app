import React from 'react'

import { CenterContainer, LimitView, Text, Button } from '../../components/common/styled'
import { textSizes, spaces } from '../../constant/size'
import StyledButton from '../../components/common/styledButton'

const Home = () => {
  return (
    <CenterContainer>
      <LimitView>
        <Text size={textSizes.large1} bold>Show the world, who you really are</Text>
        <StyledButton margin={`${spaces.large5} 0`} onPress={() => { }}>
          DONE
        </StyledButton>
      </LimitView>
    </CenterContainer>
  )
}

export default Home
