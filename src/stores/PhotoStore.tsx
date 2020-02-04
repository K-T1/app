import { observable, action } from 'mobx'
import { RootStore } from './RootStore'
import { Photo } from '@models/Photo'

export class PhotoStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  photos: Photo[] = []

  @action
  testFunc = () => {

  }
}