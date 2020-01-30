export interface User {
  id: number
  email: string
  displayName: string
  displayImage: string | null
  favorite: [string]
  createAt: Date
}
