export interface User {
  id: number
  email: string
  displayName: string
  displayImage: string | null
  favoritePhotos: [string]
  createAt: Date
}
