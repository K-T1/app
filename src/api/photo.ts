import axios from 'axios'

import configs from '@configs/index'
import { createFormData } from '@utils'

const PHOTO_API_URL = `${configs.API_URL}/photo`

export default {
  async fetchPagedPhotos(page = 1) {
    const { data: pagedPhotos } = await axios.get(`${PHOTO_API_URL}/?page=${page}`)
    return pagedPhotos
  },
  async processImage(sourceUri, refUri, referenceId) {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    const data = {
      source: {
        uri: sourceUri,
        type: 'image/jpg',
        name: 'source.jpg'
      },
      reference: {
        uri: refUri,
        type: 'image/jpg',
        name: 'reference.jpg'
      },
      referenceId
    }

    const formData = createFormData(data)

    const { data: url } = await axios.post(`${PHOTO_API_URL}/process`, formData, config)

    return url
  },
  async uploadPhoto(photoData) {
    const { data: photo } = await axios.post(`${PHOTO_API_URL}/upload`, photoData)
    return photo
  },
  async favPhoto(photoId) {
    const { data: photo } = await axios.put(`${PHOTO_API_URL}/fav`, { photoId })
    return photo
  },
  async unfavPhoto(photoId) {
    const { data: photo } = await axios.put(`${PHOTO_API_URL}/unfav`, { photoId })
    return photo
  },
  async deletePhoto(photoId) {
    const response = await axios.delete(`${PHOTO_API_URL}/delete/${photoId}`)
    return response
  }
}