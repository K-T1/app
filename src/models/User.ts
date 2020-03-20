import { Photo } from "./Photo";

export interface User {
  id: number
  email: string
  displayName: string
  displayImage: string | null
  favoritePhotos: [Photo]
  photos: [Photo]
  createAt: Date
}
