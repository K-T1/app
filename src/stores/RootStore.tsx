import { UserStore } from './UserStore'
import { PhotoStore } from './PhotoStore'
import { MediaLibraryStore } from './MediaLibraryStore'
import { SpinnerStore } from './SpinnerStore'
import { KoomToneStore } from './KoomToneStore'

export class RootStore {
  userStore: UserStore
  photoStore: PhotoStore
  mediaLibraryStore: MediaLibraryStore
  spinnerStore: SpinnerStore
  koomToneStore: KoomToneStore

  constructor() {
    this.userStore = new UserStore(this)
    this.photoStore = new PhotoStore(this)
    this.mediaLibraryStore = new MediaLibraryStore(this)
    this.spinnerStore = new SpinnerStore(this)
    this.koomToneStore = new KoomToneStore(this)
  }
}

export const rootStore = new RootStore()
