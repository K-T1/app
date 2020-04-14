import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import PreSignIn from '@components/UserProfile/PreSignIn'
import UserProfile from '@components/UserProfile'
import { UserStore } from '@stores/UserStore'
import { useNavigation } from 'react-navigation-hooks'

interface Props {
  userStore: UserStore
}

const User = ({ userStore }: Props) => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setParams({ isShowSignout: userStore.user && navigation.state.routeName === 'User' })
  }, [userStore.user])

  return (
    userStore.user
      ? <UserProfile />
      : <PreSignIn />
  )
}

export default compose(
  inject(({ rootStore }) => ({
    userStore: rootStore.userStore
  })),
  observer
)(User)
