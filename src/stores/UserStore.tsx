import { observable, action } from 'mobx'
import { RootStore } from './RootStore'

export class UserStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  firebaseUser: firebase.User

  @observable
  user = {}

  @action
  setFirebaseUser = user => {
    this.firebaseUser = user
  }

  @action
  setUser = user => {
    this.user = user
  }

  @action
  removeFirebaseUser = () => {
    this.firebaseUser = null
  }
}
