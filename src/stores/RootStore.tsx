import { UserStore } from './UserStore'
import { PhotoStore } from './PhotoStore'
import { MediaLibraryStore } from './MediaLibraryStore'

export class RootStore {
  userStore: UserStore
  photoStore: PhotoStore
  mediaLibraryStore: MediaLibraryStore

  constructor() {
    this.userStore = new UserStore(this)
    this.photoStore = new PhotoStore(this)
    this.mediaLibraryStore = new MediaLibraryStore(this)
  }
}

export const rootStore = new RootStore()
