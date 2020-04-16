import { User } from './User'

export interface Photo {
  id: number
  url: string
  width: number
  height: number
  favorite: number
  usageCount: number
  owner: User
  createAt: Date
  deleteAt: Date | null
  viewerLiked: boolean
}
