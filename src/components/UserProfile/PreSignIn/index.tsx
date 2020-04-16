import React, { useEffect } from 'react'
import { CenterSAV, Text, LimitView, CenterView } from '@components/common/styled'
import { textSizes, spaces } from '@styles/sizes'
import Button from '@components/common/Button'
import { useNavigation } from 'react-navigation-hooks'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { UserStore } from '@stores/UserStore'

interface Props {
  userStore: UserStore
}

const PreSignIn = ({ userStore }: Props) => {
  const navigation = useNavigation()

  useEffect(() => {
    if (userStore.firebaseUser) navigation.navigate('UserProfile')
  }, [])

  const login = () => {
    navigation.navigate('SignIn')
  }

  return (
    <CenterSAV>
      <LimitView>
        <CenterView>
          <Text size={textSizes.large5} bold>
            share your own style
          </Text>
          <Text margin={spaces.large3}>koom.tone</Text>
          <Button margin={'10px 0'} onPress={login}>
            sign in
          </Button>
        </CenterView>
      </LimitView>
    </CenterSAV>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    userStore: rootStore.userStore,
  })),
  observer,
)(PreSignIn)
