import React from 'react'
import { View } from 'react-native'

import PreSignIn from '@components/UserProfile/PreSignIn'
import UserProfile from '@components/UserProfile'

const User = ({ isSignIn }) => {
  return (
    isSignIn
      ? <PreSignIn />
      : <UserProfile myUser />
  )
}

export default User