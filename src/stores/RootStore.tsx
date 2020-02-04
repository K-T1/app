import { UserStore } from './UserStore'
import { PhotoStore } from './PhotoStore'
import { MediaLibraryStore } from './MediaLibraryStore'
import { SpinnerStore } from './SpinnerStore'

export class RootStore {
  userStore: UserStore
  photoStore: PhotoStore
  mediaLibraryStore: MediaLibraryStore
  spinnerStore: SpinnerStore

  constructor() {
    this.userStore = new UserStore(this)
    this.photoStore = new PhotoStore(this)
    this.mediaLibraryStore = new MediaLibraryStore(this)
    this.spinnerStore = new SpinnerStore(this)
  }
}

export const rootStore = new RootStore()
