import { observable, action } from 'mobx'
import { RootStore } from './RootStore'
import { PhotoData } from '@models/PhotoData'

export class KoomToneStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  target: PhotoData = null

  @observable
  source: PhotoData = null

  @observable
  processed: PhotoData = null

  @observable
  edited: PhotoData = null

  @action
  clearStore = () => {
    this.target = null
    this.source = null
    this.processed = null
    this.edited = null
  }

  @action
  setTarget = (target) => {
    this.target = target
  }

  @action
  setSource = (source) => {
    this.source = source
  }

  @action
  setTargetWithSource = (source) => {
    this.source = source
  }

  @action
  setProcessed = (processed) => {
    this.processed = processed
  }

  @action
  setEdited = (edited) => {
    this.edited = edited
  }
}