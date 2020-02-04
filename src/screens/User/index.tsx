import React from 'react'

import PreSignIn from '@components/UserProfile/PreSignIn'
import UserProfile from '@components/UserProfile'

const User = ({ isSignIn }) => {
  return (
    isSignIn
      ? <PreSignIn />
      : <UserProfile />
  )
}

export default User