export type PageVisit = {
  id: string
  created_at: string
  user_id: string
  origin: string|null
  page: string
}

export type PageVisitPerUser = {
  user_id: string
  page: string
  count: number
}

export type CreatePageVisitRequest = {
  user_id: string
  origin: string
  page: string
}
