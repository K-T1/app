import { observable, action } from 'mobx'

import photoApi from '@api/photo'
import { PhotoData } from '@models/PhotoData'
import { uploadImageToFirebase } from '@utils'

import { RootStore } from './RootStore'
import { Image } from 'react-native'

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

  @action
  processImage = () => {

  }

  @action
  uploadPhoto = async () => {
    const uploadedPhotoUrl = await uploadImageToFirebase(this.processed.uri)
    const photoData = {
      url: uploadedPhotoUrl,
      width: this.processed.width,
      height: this.processed.height
    }
    await photoApi.uploadPhoto(photoData)

    this.rootStore.photoStore.fetchPagedPhotos()
    this.rootStore.userStore.fetchCurrentUser()
  }
}