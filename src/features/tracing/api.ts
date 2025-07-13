import { Context, Hono } from "hono";

export default class TracingApi {
  routes(): Hono {
    return new Hono()
      .get("/v1/tracing/health", (c) => this.getHealthStatus(c))
  }

  private getHealthStatus(c: Context): any {
    return c.json({
      healthy: true
    })
  }
}
