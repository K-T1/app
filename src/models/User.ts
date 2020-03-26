import { Photo } from "./Photo";

export interface User {
  id: number
  email: string
  displayName: string
  displayImage: string | null
  favoriteCount: number
  usageCount: number
  favoritePhotos: [Photo]
  photos: [Photo]
  createAt: Date
}
