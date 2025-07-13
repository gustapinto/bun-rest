export type PageVisitExtra = {
  [key: string]: any
}

export type PageVisit = {
  id: string
  created_at: string
  user_id: string
  origin: string|null
  page: string
  extra: PageVisitExtra|null
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
  extra: PageVisitExtra
}
