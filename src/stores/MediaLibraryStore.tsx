import { observable, action } from 'mobx'
import * as MediaLibrary from 'expo-media-library'
import * as Permissions from 'expo-permissions'

import { RootStore } from './RootStore'

const assetsOptions = {
  first: 60,
  sortBy: MediaLibrary.SortBy.creationTime,
}

export class MediaLibraryStore {
  rootStore: RootStore

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  isPermissionGranted: boolean

  @observable
  albums: MediaLibrary.Album[] = []

  @observable
  pagedAssets: MediaLibrary.PagedInfo<MediaLibrary.Asset>

  @action
  getPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    this.isPermissionGranted = status === 'granted'
  }

  @action
  getAllAlbum = async () => {
    if (!this.isPermissionGranted) {
      return
    }

    const albumsReponse = await MediaLibrary.getAlbumsAsync()
    const albumsFiltered = albumsReponse.filter(album => album.id)

    this.albums = albumsFiltered
  }

  @action
  getAssets = async (selectedAlbum = null) => {
    if (!this.isPermissionGranted) {
      return
    }

    if (selectedAlbum) {
      this.pagedAssets = await MediaLibrary.getAssetsAsync({
        ...assetsOptions,
        album: selectedAlbum.id,
      })
    } else {
      this.pagedAssets = await MediaLibrary.getAssetsAsync(assetsOptions)
    }
  }

  @action
  loadMoreAssets = async album => {
    if (!this.pagedAssets.hasNextPage) return

    const newPagedAsset = await MediaLibrary.getAssetsAsync({
      ...assetsOptions,
      album,
      after: this.pagedAssets.endCursor,
    })

    this.pagedAssets = {
      ...newPagedAsset,
      assets: this.pagedAssets.assets.concat(newPagedAsset.assets),
    }
  }

  @action
  saveToLibrary = async localUri => {
    if (!this.isPermissionGranted) {
      return
    }

    if (localUri) {
      await MediaLibrary.saveToLibraryAsync(localUri)
    }
  }
}
