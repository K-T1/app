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
  fetchCurrentUser = async () => {
    this.user = await userApi.fetchCurrentUser()
  }

  @action
  setFirebaseUser = (firebaseUser: firebase.User) => {
    this.firebaseUser = firebaseUser
  }

  @action
  register = async registerDetail => {
    this.user = await userApi.register(registerDetail)
  }

  @action
  login = async user => {
    this.user = await userApi.login(user.uid)
    this.rootStore.photoStore.fetchPagedPhotos()
  }

  @action
  signout = () => {
    this.firebaseUser = null
    this.user = null
  }
}
