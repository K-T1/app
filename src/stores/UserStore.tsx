import { observable, action } from 'mobx'
import { RootStore } from './RootStore'

export class UserStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  test: number = 0

  @action
  testFunc = () => {
    this.test += 1
  }
}