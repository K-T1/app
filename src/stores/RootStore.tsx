import { UserStore } from './UserStore'
import { PhotoStore } from './PhotoStore'

export class RootStore {
  userStore: UserStore
  photoStore: PhotoStore

  constructor() {
    this.userStore = new UserStore(this)
    this.photoStore = new PhotoStore(this)
  }
}

export const rootStore = new RootStore()
