import { observable, action } from 'mobx'
import { RootStore } from './RootStore'

export class SpinnerStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  display: boolean = false

  @observable
  text: string = 'please wait for a sec'

  @action
  show = (text = 'please wait for a sec') => {
    this.display = true
    this.text = text
  }

  @action
  hide = () => {
    this.display = false
  }
}
