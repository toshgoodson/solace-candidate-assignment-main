import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("payload").$type<string[]>().default([]).notNull(), // Note: I would have a separate table of specialties with a relation to this table
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(), // Big int is potentially a poor choice as *some* phone numbers may have meaningful leading 0s
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export { advocates };

export type Advocate = typeof advocates.$inferSelect;
