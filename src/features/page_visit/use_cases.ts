import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PageVisit as PageVisit, PageVisitPerUser as PageVisitPerUser } from "./types";
import { pageVisit } from "../../../database/drizzle/schema";
import { count, or } from "drizzle-orm";
import { uuidv7 } from "uuidv7";

export default class PageVisitUseCases {
  private readonly db: NodePgDatabase

  constructor(db: NodePgDatabase) {
    this.db = db
  }

  async getAllPageVisits(): Promise<PageVisit[]> {
    return await this.db
      .select({
        id: pageVisit.id,
        created_at: pageVisit.createdAt,
        user_id: pageVisit.userId,
        origin: pageVisit.origin,
        page: pageVisit.page,
      })
      .from(pageVisit);
  }

  async getAllPageVisitsPerUser(): Promise<PageVisitPerUser[]> {
    return await this.db
      .select({
        user_id: pageVisit.userId,
        page: pageVisit.page,
        count: count()
      })
      .from(pageVisit)
      .groupBy(
        pageVisit.userId,
        pageVisit.page,
      )
  }

  async createPageVisit(user_id: string, page: string, origin: string): Promise<void> {
    await this.db
      .insert(pageVisit)
      .values({
        id: uuidv7(),
        userId: user_id,
        origin: origin,
        page: page
      })
  }
}
