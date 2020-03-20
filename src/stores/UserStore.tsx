import { observable, action } from 'mobx'

import userApi from '@api/user'
import { User } from '@models/User'

import { RootStore } from './RootStore'

export class UserStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  firebaseUser: firebase.User

  @observable
  user: User

  @action
  setFirebaseUser = async (user: firebase.User) => {
    this.firebaseUser = user
  }

  @action
  register = async registerDetail => {
    this.user = await userApi.register(registerDetail)
  }

  @action
  login = async user => {
    this.user = await userApi.login(user.uid)
  }

  @action
  signout = () => {
    this.firebaseUser = null
    this.user = null
  }
}
