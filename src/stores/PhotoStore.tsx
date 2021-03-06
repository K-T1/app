import { observable, action } from 'mobx'

import photoApi from '@api/photo'
import { Photo } from '@models/Photo'
import { PagedData } from '@models/PagedData'

import { RootStore } from './RootStore'

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
  loadMorePhotos = async () => {
    if (this.pagedPhotos.currentPage === this.pagedPhotos.lastPage) return

    const newPagedPhotos = await photoApi.fetchPagedPhotos(this.pagedPhotos.currentPage + 1)
    this.pagedPhotos = {
      ...newPagedPhotos,
      data: this.pagedPhotos.data.concat(newPagedPhotos.data),
    }
  }

  @action
  favPhoto = async photoId => {
    await photoApi.favPhoto(photoId)
    this.pagedPhotos.data.find(photo => photo.id === photoId).viewerLiked = true
    this.rootStore.userStore.fetchCurrentUser()
  }

  @action
  unfavPhoto = async photoId => {
    await photoApi.unfavPhoto(photoId)
    this.pagedPhotos.data.find(photo => photo.id === photoId).viewerLiked = false
    this.rootStore.userStore.fetchCurrentUser()
  }

  @action
  softDeletePhoto = async photoId => {
    await photoApi.deletePhoto(photoId)

    this.fetchPagedPhotos()
    this.rootStore.userStore.fetchCurrentUser()
  }
}
