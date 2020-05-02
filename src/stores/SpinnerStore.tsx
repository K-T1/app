import { observable, action } from 'mobx'
import { RootStore } from './RootStore'

export class SpinnerStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  display: boolean = true

  @action
  show = () => {
    this.display = true
  }

  @action
  hide = () => {
    this.display = false
  }
}
