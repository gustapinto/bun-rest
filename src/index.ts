import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres';
import TracingApi from './features/tracing/api'
import PageVisitUseCases from './features/page_visit/use_cases'
import PageVisitApi from './features/page_visit/api'
import { logger } from 'hono/logger'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { requestId } from 'hono/request-id'
import { uuidv7 } from 'uuidv7';

const db = drizzle(process.env.DSN)

const tracingApi = new TracingApi()

const pageVisitUseCases = new PageVisitUseCases(db)
const pageVisitApi = new PageVisitApi(pageVisitUseCases)

const app = new Hono()
  .use(
    logger(),
    trimTrailingSlash(),
    requestId({
      generator: (_) => uuidv7()
    })
  )
  .notFound((c) => c.json({"type": "errorNotFound", "message": "page does not exists"}, 404))
  .onError((err, c) => c.json({"type": "errorInternal", "message": err.message}, 422))
  .route("/", tracingApi.routes())
  .route("/", pageVisitApi.routes())

export default {
  hostname: '0.0.0.0',
  port: 3000,
  fetch: app.fetch,
}
