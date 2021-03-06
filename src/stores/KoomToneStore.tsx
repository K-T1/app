import { observable, action } from 'mobx'

import photoApi from '@api/photo'
import { PhotoData } from '@models/PhotoData'
import { uploadImageToFirebase } from '@utils'

import { RootStore } from './RootStore'

export class KoomToneStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  source: PhotoData = null

  @observable
  reference: PhotoData = null

  @observable
  processed: PhotoData = null

  @observable
  edited: PhotoData = null

  @action
  clearStore = () => {
    this.source = null
    this.reference = null
    this.processed = null
    this.edited = null
  }

  @action
  setSource = source => {
    this.source = source
  }

  @action
  setReference = reference => {
    this.reference = reference
  }

  @action
  setSourceWithReference = reference => {
    this.reference = reference
  }

  @action
  setProcessed = processed => {
    this.processed = processed
  }

  @action
  setEdited = edited => {
    this.edited = edited
  }

  @action
  processImage = async () => {
    if (!(this.source && this.reference)) return

    this.rootStore.spinnerStore.show(
      'the image is being processed, please sit\nback and wait for “art” to happend!',
    )

    const processedUri = await photoApi.processImage(
      this.source.uri,
      this.reference.uri,
      this.reference.id,
    )
    this.setProcessed({
      uri: processedUri,
      width: this.source.width,
      height: this.source.height,
    })

    // this.setProcessed({
    //   uri: this.source.uri,
    //   width: this.source.width,
    //   height: this.source.height,
    // })

    this.rootStore.spinnerStore.hide()
  }

  @action
  uploadPhoto = async () => {
    if (!this.edited) return

    this.rootStore.spinnerStore.show()
    const url = await uploadImageToFirebase(this.edited.uri)
    await photoApi.uploadPhoto({
      url,
      width: this.edited.width,
      height: this.edited.height,
    })

    this.rootStore.photoStore.fetchPagedPhotos()
    this.rootStore.userStore.fetchCurrentUser()
    this.rootStore.spinnerStore.hide()
  }
}
