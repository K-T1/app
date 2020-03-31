import { observable, action } from 'mobx'

import photoApi from '@api/photo'
import { Photo } from '@models/Photo'
import { PagedData } from '@models/PagedData'

import { RootStore, rootStore } from './RootStore'

export class PhotoStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  pagedPhotos: PagedData<Photo>

  @action
  fetchPagedPhotos = async () => {
    this.pagedPhotos = await photoApi.fetchPagedPhotos()
  }

  @action
  favPhoto = async (photoId) => {
    await photoApi.favPhoto(photoId)
    this.pagedPhotos.data.find(photo => photo.id === photoId).viewerLiked = true
    this.rootStore.userStore.fetchCurrentUser()
  }

  @action
  unfavPhoto = async (photoId) => {
    await photoApi.unfavPhoto(photoId)
    this.pagedPhotos.data.find(photo => photo.id === photoId).viewerLiked = false
    this.rootStore.userStore.fetchCurrentUser()
  }
}