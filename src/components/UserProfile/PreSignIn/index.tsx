import React from 'react'
import { CenterSAV, Text, LimitView } from '@components/common/styled'
import { textSizes, spaces } from '@styles/sizes'
import Button from '@components/common/Button'
import { NavigationStackProp } from 'react-navigation-stack'
import { useNavigation } from 'react-navigation-hooks'

const PreSignIn = () => {
  const navigation = useNavigation()

  return (
    <CenterSAV>
      <LimitView>
        <Text size={textSizes.large7} bold>share your own style</Text>
        <Text margin={spaces.large5}>koom.tone</Text>
        <Button onPress={() => navigation.navigate('SignIn')}>sign in</Button>
      </LimitView>
    </CenterSAV>
  )
}

export default PreSignIn