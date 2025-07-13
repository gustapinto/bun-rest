import { Context, Hono } from "hono";
import PageVisitUseCases from "./use_cases";
import { CreatePageVisitRequest } from "./types";

export default class PageVisitApi {
  private useCases: PageVisitUseCases

  constructor(useCases: PageVisitUseCases) {
    this.useCases = useCases
  }

  routes(): Hono {
    return new Hono()
      .get("/v1/visits", (c) => this.getAll(c))
      .post("/v1/visits", (c) => this.create(c))
      .get("/v1/visits-per-user", (c) => this.getAllPerUser(c))
  }

  async getAll(c: Context): Promise<any> {
    const visits = await this.useCases.getAllPageVisits()

    return c.json(visits)
  }

  async getAllPerUser(c: Context): Promise<any> {
    const visits = await this.useCases.getAllPageVisitsPerUser()

    return c.json(visits)
  }

  async create(c: Context): Promise<any> {
    const req: CreatePageVisitRequest = await c.req.json()

    await this.useCases.createPageVisit(
      req.user_id,
      req.page,
      req.origin,
    )
  }
}
