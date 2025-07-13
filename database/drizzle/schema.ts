import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const pageVisit = pgTable("page_visit", {
	id: uuid().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	userId: uuid("user_id").notNull(),
	origin: varchar({ length: 500 }),
	page: varchar({ length: 255 }).notNull(),
});
