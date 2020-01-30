import { User } from "./User";

export interface Photo {
  id: number
  uri: string
  width: number
  height: number
  favoriteCount: number
  usageCount: number
  owner: User
  createAt: Date
  deleteAt: Date | null
}