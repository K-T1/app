import axios from 'axios'

import configs from '@configs/index'

export default {
  async fetchPagedPhotos() {
    const { data: pagedPhotos } = await axios.get(`${configs.API_URL}/photo`)
    return pagedPhotos
  },
  async favPhoto(photoId) {
    const { data: photo } = await axios.put(`${configs.API_URL}/photo/fav`, {
      photoId
    })
    return photo
  },
  async unfavPhoto(photoId) {
    const { data: photo } = await axios.put(`${configs.API_URL}/photo/unfav`, {
      photoId
    })
    return photo
  }
}