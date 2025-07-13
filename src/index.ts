import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres';
import TracingApi from './features/tracing/api'
import PageVisitUseCases from './features/page_visit/use_cases'
import PageVisitApi from './features/page_visit/api'

const db = drizzle(process.env.DSN)

const tracingApi = new TracingApi()

const pageVisitUseCases = new PageVisitUseCases(db)
const pageVisitApi = new PageVisitApi(pageVisitUseCases)

const app = new Hono()
  .notFound((c) => c.json({"type": "errorNotFound", "message": "page does not exists"}))
  .onError((err, c) => c.json({"type": "errorInternal", "message": err.message}))
  .route("/", tracingApi.routes())
  .route("/", pageVisitApi.routes())

export default {
  hostname: '0.0.0.0',
  port: 3000,
  fetch: app.fetch,
}
