import { observable, action } from 'mobx'
import { RootStore } from './RootStore'

enum Step {
  SOURCE,
  TARGET,
  EDIT,
  SHARE
}

export class KoomToneStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  currentStep: Step = Step.SOURCE

  @action
  testFunc = () => {

  }
}