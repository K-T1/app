export interface PagedData<T> {
  total: number
  from: number
  to: number
  currentPage: number
  lastPage: number
  perPage: number
  data: T[]
}
