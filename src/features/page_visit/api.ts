import { Context, Hono } from "hono";
import PageVisitUseCases from "./use_cases";
import { CreatePageVisitRequest } from "./types";

export default class PageVisitApi {
  constructor(
    private readonly useCases: PageVisitUseCases
  ) {}

  routes(): Hono {
    return new Hono()
      .get("/v1/page-visits", (c) => this.getAll(c))
      .post("/v1/page-visits", (c) => this.create(c))
      .get("/v1/page-visits-per-user", (c) => this.getAllPerUser(c))
  }

  private async getAll(c: Context): Promise<any> {
    const visits = await this.useCases.getAllPageVisits()

    return c.json(visits)
  }

  private async getAllPerUser(c: Context): Promise<any> {
    const visits = await this.useCases.getAllPageVisitsPerUser()

    return c.json(visits)
  }

  private async create(c: Context): Promise<any> {
    const req: CreatePageVisitRequest = await c.req.json()

    await this.useCases.createPageVisit(
      req.user_id,
      req.page,
      req.origin,
      req.extra,
    )

    return c.json({}, 201)
  }
}
