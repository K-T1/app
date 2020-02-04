import React from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import PreSignIn from '@components/UserProfile/PreSignIn'
import UserProfile from '@components/UserProfile'
import { UserStore } from '@stores/UserStore'

interface Props {
  userStore: UserStore
}

const User = ({ userStore }: Props) => {
  return (
    userStore.firebaseUser
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
